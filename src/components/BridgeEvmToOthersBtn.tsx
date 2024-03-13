"use client";
import { ethers } from "ethers";
import base58 from "bs58";
import { hexZeroPad } from "@ethersproject/bytes";
import { bridgeAbi, guardianFactoryAbi } from "@/utils/abi/WormholeBridge";
import {
  BRIDGE_ADDRESS_FOR_BSC,
  BRIDGE_CONTRACT_ADDRESS,
  BSCTN_DECIMAL,
} from "@/utils/const";
import { createNonce } from "@/utils/createNonce";
import { decimalValueToHex, getEmitterAddressEth } from "@/utils/converter";
import { useBridgeInfo } from "@/stores/bridgeInfoStore";
import { useFlowStore } from "@/stores/flowStore";
import { AddressShortener } from "@/utils/converter";
import {} from "ethers";
import { parseSequencesFromLogEth } from "@/utils/converter";
import { GetSignedVAA } from "@/utils/vaa/ownSignVAA";

export default function BridgeFromEvmButton() {
  const targetATA = useBridgeInfo.use.targetATA();
  const amount = useBridgeInfo.use.amount();
  const targetChainId = useBridgeInfo.use.targetChainId();
  const txNonce = createNonce().readUInt32LE(0);
  const updateFlowState = useFlowStore.use.addStep();
  const updateFlowStateRes = useFlowStore.use.addStepResult();

  const handleTransfer = async () => {
    /* generate contract call txdata */
    updateFlowState("Generate raw contract data");
    const BridgeContract = new ethers.Contract(
      BRIDGE_CONTRACT_ADDRESS,
      bridgeAbi
    );

    const solanaAs32bit = hexZeroPad(
      "0x" + Buffer.from(base58.decode(targetATA)).toString("hex"),
      32
    );
    console.log("convert solana address to base 32: ", solanaAs32bit);

    const evmAmount = decimalValueToHex(amount.toString(), BSCTN_DECIMAL);

    var populatedBridge =
      await BridgeContract.populateTransaction.wrapAndTransferETH(
        targetChainId,
        solanaAs32bit,
        BigInt(0),
        BigInt(txNonce)
      );
    console.log("built tx: ", populatedBridge);

    populatedBridge.data &&
      updateFlowStateRes(
        "Raw bridge data: " + AddressShortener(populatedBridge.data, 10)
      );
    populatedBridge.value = ethers.BigNumber.from(
      Math.pow(10, 18) * Number(amount)
    );
    console.log("bridge tx: ", populatedBridge);
    /* transfer to bridge contract */
    updateFlowState("Call bridge contract");

    /* init provider and signer */
    const MMprovider = new ethers.providers.Web3Provider(window.ethereum);
    const MMSigner = MMprovider.getSigner();

    /* TODO: handle reject case */
    const txResponse = await MMSigner.sendTransaction(populatedBridge);
    console.log("tx response: ", txResponse);
    updateFlowStateRes(
      "Bridge contract hash: " + AddressShortener(txResponse.hash, 5)
    );

    /* wait for enough confirmations from nodes */
    // wait for result to be recorded by 15 blocks following wormhole's protocol
    updateFlowState("Wait for confirmations on BSC Testnet");
    const txReceipt = await txResponse.wait(15);
    console.log("tx receipt: ", txReceipt?.logs);
    updateFlowStateRes("Blocks written: 15");

    /* Parse sequence from bridge contract event*/
    updateFlowState("Parse sequence from bridge contract event");
    const sequence = parseSequencesFromLogEth(
      txReceipt,
      BRIDGE_ADDRESS_FOR_BSC,
      guardianFactoryAbi
    );
    updateFlowStateRes("Sequence: " + sequence);

    /* Retrieve event emitter address*/
    updateFlowState("Retrieve event emitter address");
    const emitterAddress = getEmitterAddressEth(BRIDGE_CONTRACT_ADDRESS);
    console.log("emitter address: ", emitterAddress);
    updateFlowStateRes("Address: " + emitterAddress);

    /* get signed VAA */
    updateFlowState("Retrieve signed VAA through gRPC call");
    const signedVAA = await GetSignedVAA({
      messageId: {
        emitterChain: 4,
        emitterAddress,
        sequence,
      },
    });
    updateFlowStateRes("Signed VAA status: fulfilled");
  };
  return (
    <div>
      <button
        className="px-[12px] py-[6px] rounded-lg border border-black"
        onClick={handleTransfer}
      >
        Transfer
      </button>
    </div>
  );
}
