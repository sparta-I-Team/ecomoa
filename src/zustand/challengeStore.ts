import { ChallengeStoreType } from "@/types/challengesType";
import { create } from "zustand";

export const useChallengeStore = create<ChallengeStoreType>((set) => ({
  step: 1,
  selectedChallenges: [],
  setStep: (step) => set({ step }),
  setSelectedChallenges: (challenges) => set({ selectedChallenges: challenges })
}));
