"use client";

import { useState } from "react";

import { Connection, PublicKey, Transaction } from "@solana/web3.js";

import { getProvider } from "@/utils/phantomWallet";
import { VerifySolanaATA } from "@/utils/setupAccount";
import { TWSpinnerFancyText, TWDoneLoadFancyText } from "./TailwindUI/Spinner";

import { AddressShortener } from "@/utils/converter";
import TransferButton from "./TransferButton";

import {
  BNB_NATIVE_SOURCE_ASSET,
  SOL_WRAP_BNB,
  SOLANA_HOST,
} from "@/utils/const";

export default function TestBridge() {
  const [solanaAccount, setSolanaAccount] = useState<any>(null);

  const [checkingATA, setChecking] = useState(0);

  const connection = new Connection(SOLANA_HOST, "confirmed");

  /* setup solana account section */
  const SetupSolanaAccount = async () => {
    const provider = getProvider();
    /* connect wallet & request account */
    try {
      const resp = await provider.connect();
      console.log("Solana Account pk: ", resp.publicKey.toString());
      setSolanaAccount(resp.publicKey);
      setChecking(1);
      console.log(
        "ata: ",
        await VerifySolanaATA(connection, provider, resp.publicKey.toString())
      );
      setChecking(2);
    } catch (err) {
      /*TODO: handle connection error(reject request)  */
      setChecking(0);
    }
  };

  return (
    <div className="flex items-start w-full pt-10 justify-between">
      {/* Step info section */}
      <div className="flex flex-col items-start p-7 border-r-2 border-slate-400 grow">
        {/* Account setup step */}
        <h1 className="font-bold">SETUP account progess with info:</h1>
        <div>
          <span className="font-semibold">Solana Account:</span>
          {solanaAccount ? solanaAccount.toString() : <></>}
        </div>
        <div>
          <span className="font-semibold">BNB address:</span>
          {BNB_NATIVE_SOURCE_ASSET}
        </div>
        <div>
          <span className="font-semibold">
            Wormhole Wrapped BNB token address:
          </span>
          {SOL_WRAP_BNB}
        </div>
      </div>
      {/* progress section */}
      <div className="flex flex-col items-start p-6 border-r-2 border-slate-400 w-[800px]">
        {/* verifying section */}
        <div>
          {checkingATA === 1 && (
            <TWSpinnerFancyText
              text={"Verifying the existence of corresponding ATA account"}
            />
          )}
          {checkingATA === 2 && (
            <TWDoneLoadFancyText text={"ATA account existence confirmed!"} />
          )}
        </div>
      </div>
      {/* Flow simulator */}
      <div className="flex flex-col items-center justify-start w-[200px]">
        {/* connect wallet section */}
        <div className="flex flex-col items-center mb-20">
          <button
            className="px-[12px] py-[6px] border rounded-lg text-base border-violet-600"
            onClick={SetupSolanaAccount}
          >
            {!solanaAccount
              ? "Connect Phantom"
              : AddressShortener(solanaAccount.toString(), 6)}
          </button>
        </div>
        {/* transfer section */}
        <TransferButton />
      </div>
    </div>
  );
}
