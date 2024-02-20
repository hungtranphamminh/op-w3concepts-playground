import { create } from "zustand";

import { createSelectors } from "@/utils/zustand";

/* progress state management*/
type bridgeInfoState = {
  targetAddress: string | null;
  targetATA: string | null;
  targetChainId: BigInt; // default as wormhole solana chain id
  amount: BigInt | null;
};

type bridgeInfoAction = {
  updateTargetAddress: (address: string) => void;
  updateTargetATA: (address: string) => void;
  updateAmount: (amount: BigInt) => void;
};

const bridgeInfoStore = create<bridgeInfoState & bridgeInfoAction>((set) => ({
  targetAddress: null,
  targetATA: null,
  targetChainId: BigInt(1),
  amount: null,
  updateTargetAddress: (address) => set(() => ({ targetAddress: address })),
  updateTargetATA: (address) => set(() => ({ targetATA: address })),
  updateAmount: (amount) => set(() => ({ amount: amount })),
}));

export const useBridgeInfo = createSelectors(bridgeInfoStore);
