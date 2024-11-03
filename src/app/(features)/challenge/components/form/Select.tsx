import { CHALLENGES, CHALLENGE_OPTIONS } from "@/utlis/challenge/challenges";
import { useChallengeStore } from "@/zustand/challengeStore";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface Props {
  selectedOptions: Record<string, string[]>;
  onToggle: (challengeId: string, optionId: string) => void;
  error?:
    | Merge<FieldError, FieldErrorsImpl<{ [x: string]: string[] }>>
    | FieldError;
}

const Select = ({ selectedOptions, onToggle, error }: Props) => {
  const { selectedChallenges } = useChallengeStore();

  const getErrorMessage = () => {
    if (!error) return null;
    return typeof error.message === "string" ? error.message : null;
  };

  return (
    <div>
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
      {getErrorMessage() && (
        <p className="text-red-500 text-sm mt-2">{getErrorMessage()}</p>
      )}
    </div>
  );
};

export default Select;
