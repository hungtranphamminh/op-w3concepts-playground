"use client";
import { useSolanaStore } from "@/stores/solanaStore";
import { AddressShortener } from "@/utils/converter";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { SOLANA_HOST } from "@/utils/const";
import {
  VerifyOrCreateSolanaATA,
  GenerateATA,
  VerifyATA,
} from "@/utils/setupAccount";
import { getProvider } from "@/utils/wallet/phantomWallet";
import { useProgressStore } from "@/stores/progressStore";
import { useFlowStore } from "@/stores/flowStore";

export default function SetupSolana() {
  const solanaAccount = useSolanaStore.use.account();
  const setSolanaAccount = useSolanaStore.use.updateAccount();
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
      /* sol step 2: generate corresponding ATA */
      updateFlowState("Retrieve associated token account(ATA)");
      const retrievedATA = await GenerateATA(
        connection,
        provider,
        resp.publicKey.toString()
      );
      updateFlowStateRes("ATA address: " + retrievedATA.toString());

      await VerifyOrCreateSolanaATA(
        connection,
        provider,
        resp.publicKey.toString()
      );
    } catch (err) {
      /*TODO: handle connection error(reject request)  */
    }
  };

  return (
    <button
      className="px-[12px] py-[6px] border rounded-lg text-base border-violet-600 w-[200px]"
      onClick={SetupSolanaAccount}
    >
      {!solanaAccount
        ? "Connect Phantom"
        : AddressShortener(solanaAccount.toString(), 6)}
    </button>
  );
}
