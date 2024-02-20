"use client";
import { useState, useEffect, useCallback } from "react";
import { Contract } from "ethers";
import base58 from "bs58";
import { hexZeroPad } from "@ethersproject/bytes";
import { bridgeAbi } from "@/utils/abi/WormholeBridge";
import { BRIDGE_CONTRACT_ADDRESS } from "@/utils/const";
import { createNonce } from "@/utils/createNonce";
import { contractDecoder } from "@/utils/converter";

export default function TransferButton() {
  useEffect(() => {
    contractDecoder();
  }, []);
  const BridgeContract = new Contract(BRIDGE_CONTRACT_ADDRESS, bridgeAbi);
  const handleTransfer = async () => {
    const solanaAs32bit = hexZeroPad(
      "0x" +
        Buffer.from(
          base58.decode("CsiV8P16kxCwSRhiDf1BnqRd67c7VwxXZbr96ZsmAcNH")
        ).toString("hex"),
      32
    );
    console.log("convert solana address to base 32: ", solanaAs32bit);

    // const populatedBridge =
    //   await BridgeContract.wrapAndTransferETH.populateTransaction(
    //     1,
    //     hexZeroPad(
    //       "0x" +
    //         Buffer.from(
    //           base58.decode("CsiV8P16kxCwSRhiDf1BnqRd67c7VwxXZbr96ZsmAcNH")
    //         ).toString("hex"),
    //       32
    //     ),
    //     1000000000000000,
    //     createNonce()
    //   );
    // console.log("bridge transaction: ", populatedBridge);
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
