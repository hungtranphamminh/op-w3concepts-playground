import { create } from "zustand";

import { PublicKey } from "@solana/web3.js";
import { createSelectors } from "@/utils/zustand";

/* solana account state management*/
type solanaState = {
  account: PublicKey | null;
};

type Action = {
  updateAccount: (account: solanaState["account"]) => void;
};

const solanaStore = create<solanaState & Action>((set) => ({
  account: null,
  updateAccount: (account) => set(() => ({ account: account })),
}));

export const useSolanaStore = createSelectors(solanaStore);
