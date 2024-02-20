import TestBridge from "@/components/BridgeButton";
import { MetaMaskContextProvider } from "@/hooks/useMetamask";
declare global {
  interface Window {
    phantom: any;
    ethereum: any;
  }
}

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className="w-full">
        <div className="flex items-center justify-start pt-20 flex-col w-full h-[100vh] ">
          <TestBridge />
        </div>
      </main>
    </MetaMaskContextProvider>
  );
}
