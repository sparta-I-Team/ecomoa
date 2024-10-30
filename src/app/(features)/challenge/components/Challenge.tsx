"use client";
import { Modal } from "@/components/shared/Modal";
import { ChallengeForm } from "./ChallengeForm";
import { ChallengeSelection } from "./ChallengeSelection";
import ChallengeHeader from "./ChallengeHeader";
import { useChallengeStore } from "@/zustand/challengeStore";

export const Challenge = () => {
  const { step } = useChallengeStore();

  return (
    <main className="pt-4">
      {step === 1 ? (
        <>
          <ChallengeHeader />
          <ChallengeSelection />
          <Modal />
        </>
      ) : (
        <ChallengeForm />
      )}
    </main>
  );
};
