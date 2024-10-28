"use client";
import { ChallengeSelection } from "./ChallengeSelection";
import { ChallengeForm } from "./ChallengeForm";
import { useChallengeStore } from "@/zustand/challengeStore";

export const ChallengeSection = () => {
  const { step } = useChallengeStore();

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">데일리 챌린지</h1>
      {step === 1 ? <ChallengeSelection /> : <ChallengeForm />}
    </section>
  );
};
