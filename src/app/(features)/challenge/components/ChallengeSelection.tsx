import { useForm } from "react-hook-form";
import { useState } from "react";
import { CHALLENGES } from "@/utlis/challenges";
import { useChallengeStore } from "@/zustand/challengeStore";

export const ChallengeSelection = () => {
  const { handleSubmit } = useForm();
  const { setStep, setSelectedChallenges } = useChallengeStore();

  const [selected, setSelected] = useState<string[]>([]);

  const onSubmit = () => {
    if (selected.length === 0) {
      alert("최소 하나의 챌린지를 선택해주세요.");
      return;
    }
    setSelectedChallenges(selected);
    setStep(2);
  };

  const handleToggleChallenge = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        {CHALLENGES.map((challenge) => (
          <label
            key={challenge.id}
            className={`p-4 border rounded-lg cursor-pointer
              ${
                selected.includes(challenge.id)
                  ? "bg-gray-100 border-gray-500"
                  : ""
              }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(challenge.id)}
              onChange={() => handleToggleChallenge(challenge.id)}
              className="hidden"
            />
            <span>{challenge.label}</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
      >
        다음 단계
      </button>
    </form>
  );
};
