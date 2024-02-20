"use client";
import { AddressShortener } from "@/utils/converter";
import { useMetaMask } from "@/hooks/useMetamask";
import { useProgressStore } from "@/stores/progressStore";

export default function SetupEVM() {
  const updateEvmProgress = useProgressStore.use.updateEvmSetupStep();
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  /* setup solana account section */
  const SetupEVMAccount = async () => {
    updateEvmProgress(1);
    connectMetaMask();
  };
  return (
    <>
      {hasProvider && (
        <button
          className="px-[12px] py-[6px] border rounded-lg text-base border-violet-600 w-[200px]"
          onClick={SetupEVMAccount}
        >
          {!wallet.accounts[0]
            ? "Connect Metamask"
            : AddressShortener(wallet.accounts[0], 6)}
        </button>
      )}
    </>
  );
}
