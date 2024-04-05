"use client";
import { useSolanaStore } from "@/stores/solanaStore";
import { AddressShortener } from "@/utils/converter";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { SOLANA_HOST } from "@/utils/const";
import { GenerateATA, VerifyATA, SuggestAddATA } from "@/utils/setupAccount";
import { getProvider } from "@/utils/wallet/phantomWallet";
import { useFlowStore } from "@/stores/flowStore";
import { useBridgeInfo } from "@/stores/bridgeInfoStore";

export default function SetupSolana() {
  const solanaAccount = useSolanaStore.use.account();
  const setSolanaAccount = useSolanaStore.use.updateAccount();
  /* save bridge target info */
  const updateTargetAddress = useBridgeInfo.use.updateTargetAddress();
  const updateTargetATA = useBridgeInfo.use.updateTargetATA();

  const updateFlowState = useFlowStore.use.addStep();
  const updateFlowStateRes = useFlowStore.use.addStepResult();
  /* setup solana account section */
  const connection = new Connection(SOLANA_HOST, "confirmed");

  const SetupSolanaAccount = async () => {
    const provider = getProvider();
    try {
      /* sol step 1: connect account */
      updateFlowState("Connect Phantom wallet");
      const resp = await provider.connect();
      updateFlowStateRes("Address: " + resp.publicKey.toString());
      setSolanaAccount(resp.publicKey);
      updateTargetAddress(resp.publicKey.toString());
      /* sol step 2: generate corresponding ATA */
      updateFlowState("Retrieve associated token account(ATA)");

      const retrievedATA = await GenerateATA(
        connection,
        provider,
        resp.publicKey.toString()
      );

      updateFlowStateRes("ATA address: " + retrievedATA.toString());
      /* sol step 3: verify the existence of ATA  */
      updateFlowState("Verify the existence of corresponding ATA");
      const verifyStatus = await VerifyATA(
        connection,
        provider,
        resp.publicKey.toString(),
        retrievedATA
      );
      updateFlowStateRes("ATA status: " + verifyStatus);
      /* sol step 4: suggest to create account if needed */
      if (verifyStatus !== "Exist") {
        updateFlowState("Create the of corresponding ATA");
        try {
          await SuggestAddATA(
            connection,
            provider,
            resp.publicKey.toString(),
            retrievedATA
          );
          updateFlowStateRes("ATA status: created");
        } catch (error: any) {
          console.log("Create ata failed with error: ", error);
        }
      }
      updateTargetATA(retrievedATA.toString());
    } catch (err) {
      /*TODO: handle connection error(reject request)  */
    }
  };

  return (
    <button
      className="px-[12px] py-[6px] border text-base bg-white w-[200px]"
      onClick={SetupSolanaAccount}
    >
      {!solanaAccount
        ? "Connect Phantom"
        : AddressShortener(solanaAccount.toString(), 6)}
    </button>
  );
}
