import { CHALLENGES, CHALLENGE_OPTIONS } from "@/utlis/challenges";
import { useChallengeStore } from "@/zustand/challengeStore";
import React from "react";

interface Props {
  selectedOptions: Record<string, string[]>;
  onToggle: (challengeId: string, optionId: string) => void;
}
const Select = ({ selectedOptions, onToggle }: Props) => {
  const { selectedChallenges } = useChallengeStore();
  return (
    <div className="space-y-2">
      {selectedChallenges.map((challengeId) => {
        const challenge = CHALLENGES.find((c) => c.id === challengeId);
        const options = CHALLENGE_OPTIONS[challengeId] || [];

        return (
          <div key={challengeId} className="rounded-lg">
            <h3 className="font-bold mb-4">{challenge?.label}</h3>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onToggle(challengeId, option.id)}
                  className={`rounded-xl bg-gray-300 px-3 py-1 text-sm transition-colors ${
                    selectedOptions[challengeId]?.includes(option.id)
                      ? "bg-gray-900 text-white"
                      : "text-black border border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Select;
