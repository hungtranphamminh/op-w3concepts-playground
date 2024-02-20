"use client";
import { useProgressStore } from "@/stores/progressStore";
import SingleStatusBar from "./SingleStatusBar";
export default function SolAccSetupProgress() {
  const currentStep = useProgressStore.use.solSetupStep();

  return (
    <>
      <div className="flex flex-col items-start">
        <SingleStatusBar
          pre="Connect Phantom Wallet"
          loading="Connecting ..."
          complete="Solana account connected!"
          middle={2}
          indicator={currentStep}
        />
        <SingleStatusBar
          pre="Verify the existence of corresponding ATA account"
          loading="Verifying ATA account"
          complete="ATA account existence confirmed!"
          middle={4}
          indicator={currentStep}
        />
      </div>
    </>
  );
}
