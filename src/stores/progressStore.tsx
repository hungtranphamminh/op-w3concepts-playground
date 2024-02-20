import { create } from "zustand";

import { createSelectors } from "@/utils/zustand";

/* progress state management*/
type progressState = {
  solSetupStep: number;
  evmSetupStep: number;
};

type Action = {
  updateSolSetupStep: (step: number) => void;
  updateEvmSetupStep: (step: number) => void;
};

const progressStore = create<progressState & Action>((set) => ({
  solSetupStep: -1,
  evmSetupStep: -1,
  updateSolSetupStep: (step) => set(() => ({ solSetupStep: step })),
  updateEvmSetupStep: (step) => set(() => ({ evmSetupStep: step })),
}));

export const useProgressStore = createSelectors(progressStore);
