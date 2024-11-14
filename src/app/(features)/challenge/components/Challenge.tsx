"use client";
import { Modal } from "@/components/shared/Modal";
import { ChallengeSelection } from "./ChallengeSelection";
import ChallengeHeader from "./ChallengeHeader";
import { useChallengeStore } from "@/zustand/challengeStore";
import Calendar from "@/components/ui/Calendar";
import { useEffect } from "react";
import ChallengeForm from "./ChallengeForm";

export const Challenge = () => {
  const { step, setStep } = useChallengeStore();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  return (
    <main className="">
      {step === 1 ? (
        <div className="flex flex-col gap-[200px]">
          <div className="h-full">
            <div className="max-w-[1200px] mx-auto">
              <ChallengeHeader />
              <ChallengeSelection />
            </div>
          </div>
          {/*  */}
          <div className="h-full bg-[#F2F9F2]">
            <div className="max-w-[1200px] mx-auto pt-[106px]">
              <Calendar />
            </div>
          </div>
          <Modal />
        </div>
      ) : (
        <div className="h-full">
          <div className="max-w-[1200px] mx-auto py-[52px]">
            <ChallengeForm />
          </div>
        </div>
      )}
    </main>
  );
};
