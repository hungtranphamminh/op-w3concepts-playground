import { create } from "zustand";

import { createSelectors } from "@/utils/zustand";

/* progress state management*/
type flowState = {
  step: string[];
  stepResult: string[];
};

type flowwAction = {
  addStep: (step: string) => void;
  addStepResult: (step: string) => void;
};

const flowStore = create<flowState & flowwAction>((set, get) => ({
  step: [],
  stepResult: [],
  addStep: (newStep) => {
    let tempStep = [...get().step];
    tempStep.push(newStep);
    set((state) => ({ step: tempStep }));
  },
  addStepResult: (newStep) => {
    let tempStep = [...get().stepResult];
    tempStep.push(newStep);
    set((state) => ({ stepResult: tempStep }));
  },
}));

export const useFlowStore = createSelectors(flowStore);
