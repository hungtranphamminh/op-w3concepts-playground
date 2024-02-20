"use client";
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
} from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "@/utils/converter";
import { useProgressStore } from "@/stores/progressStore";
import { useFlowStore } from "@/stores/flowStore";

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
};

const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData
);
/* metamask context provider */
export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const updateEvmProgress = useProgressStore.use.updateEvmSetupStep();
  /* update progress status */
  const updateFlowInfo = useFlowStore.use.addStep();
  const updateFlowInfoRes = useFlowStore.use.addStepResult();

  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);
  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  /* update wallet info */
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );

  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet]
  );

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      updateFlowInfo("Connect Metamask account");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      updateFlowInfoRes("Address: " + accounts[0]);
      clearError();
      updateWallet(accounts);
      updateEvmProgress(2);

      verifyOrSwitchChain();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const verifyOrSwitchChain = async () => {
    updateEvmProgress(4);
    try {
      updateFlowInfo("Check for current chain(BSCTN)");
      let currentChain = await window.ethereum.request({
        method: "eth_chainId",
        params: [],
      });

      if (currentChain === "0x61") {
        updateEvmProgress(5);
        updateFlowInfoRes("Current chain Id: " + currentChain);
        return;
      }

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x61",
          },
        ],
      });

      currentChain = await window.ethereum.request({
        method: "eth_chainId",
        params: [],
      });
      updateFlowInfoRes("Current chain Id: " + currentChain);

      updateEvmProgress(5);
      clearError();
      updateWalletAndAccounts();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      "useMetaMask must be used within a MetaMaskContextProvider"
    );
  }
  return context;
};
