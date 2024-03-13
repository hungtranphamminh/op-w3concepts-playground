import { create } from "zustand";

import { createSelectors } from "@/utils/zustand";

/* progress state management*/
type bridgeInfoState = {
  targetAddress: string;
  targetATA: string;
  targetChainId: BigInt; // default as wormhole solana chain id
  amount: Number;
};

type bridgeInfoAction = {
  updateTargetAddress: (address: string) => void;
  updateTargetATA: (address: string) => void;
  updateAmount: (amount: Number) => void;
};

const bridgeInfoStore = create<bridgeInfoState & bridgeInfoAction>((set) => ({
  targetAddress: "",
  targetATA: "",
  targetChainId: BigInt(1),
  amount: 0,
  updateTargetAddress: (address) => {
    console.log("target address change: ", address);
    set(() => ({ targetAddress: address }));
  },
  updateTargetATA: (address) => {
    console.log("ATA change: ", address);
    set(() => ({ targetATA: address }));
  },
  updateAmount: (amount) => {
    console.log("amount change: ", amount);
    set(() => ({ amount: amount }));
  },
}));

export const useBridgeInfo = createSelectors(bridgeInfoStore);
