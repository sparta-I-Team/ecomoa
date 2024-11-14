import { ChallengeStoreType } from "@/types/challengesType";
import { create } from "zustand";

export const useChallengeStore = create<ChallengeStoreType>((set) => ({
  step: 1,
  selectedChallenges: [],
  initialChallenges: [], // 추가
  setStep: (step) => set({ step }),
  setSelectedChallenges: (challenges) =>
    set({ selectedChallenges: challenges }),
  setInitialChallenges: (challenges) =>
    set({
      // 추가
      initialChallenges: challenges,
      selectedChallenges: challenges
    })
}));
