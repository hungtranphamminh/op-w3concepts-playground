import TestBridge from "@/components/BridgeButton";

declare global {
  interface Window {
    phantom: any;
  }
}

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex items-center justify-start pt-20 flex-col w-full h-[100vh] ">
        <TestBridge />
      </div>
    </main>
  );
}
