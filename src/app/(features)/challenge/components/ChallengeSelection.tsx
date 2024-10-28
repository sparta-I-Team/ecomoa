import { useForm } from "react-hook-form";
import { useState } from "react";
import { useChallengeStore } from "@/zustand/challengeStore";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { CHALLENGES } from "@/utlis/challenges";

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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 mx-auto">
      <h1>데일리 탄소 절감 챌린지</h1>
      <div className="grid grid-cols-6 gap-4 pt-8">
        {CHALLENGES.map((challenge) => (
          <div
            key={challenge.id}
            className="flex flex-col space-y-3 justify-center items-center py-4 border rounded-lg cursor-pointer"
            onClick={() => handleToggleChallenge(challenge.id)}
          >
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full text-center" />
            <label className="w-full font-bold text-[12px]">
              <input
                type="checkbox"
                checked={selected.includes(challenge.id)}
                onChange={() => handleToggleChallenge(challenge.id)}
                className="hidden"
              />
              <span className="block text-center">{challenge.label}</span>
            </label>
            <div
              className={`px-4 flex items-center justify-center rounded-xl transition-colors
                ${
                  selected.includes(challenge.id)
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }
              `}
            >
              C
            </div>
          </div>
        ))}
      </div>
      <BlackAutoWidthButton text="챌린지 인증하기" />
    </form>
  );
};
