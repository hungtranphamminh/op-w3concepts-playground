"use client";
import { useProgressStore } from "@/stores/progressStore";
import SingleStatusBar from "./SingleStatusBar";
export default function EvmAccSetupProgress() {
  const currentStep = useProgressStore.use.evmSetupStep();

  return (
    <>
      <div className="flex flex-col items-start">
        <SingleStatusBar
          pre="Connect Metamask Wallet"
          loading="Connecting ..."
          complete="Metamask account connected!"
          middle={1}
          indicator={currentStep}
        />
        <SingleStatusBar
          pre="Verify chain"
          loading="Matching chain to BSCTN"
          complete="BSCTN account connected!"
          middle={4}
          indicator={currentStep}
        />
      </div>
    </>
  );
}
