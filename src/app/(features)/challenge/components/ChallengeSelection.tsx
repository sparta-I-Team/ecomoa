import { useForm } from "react-hook-form";
import { useState } from "react";
import { useChallengeStore } from "@/zustand/challengeStore";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { CHALLENGES } from "@/utlis/challenge/challenges";
import { Check } from "lucide-react";
import Image from "next/image";

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
      <h1 className="font-semibold text-[16px] ">데일리 탄소 절감 챌린지</h1>
      <div className="grid grid-cols-6 gap-4 pt-4">
        {CHALLENGES.map((challenge) => (
          <div
            key={challenge.id}
            className={`flex flex-col w-[190px] h-[232px] justify-around items-center py-4 border rounded-3xl cursor-pointer
              ${selected.includes(challenge.id) && " border-[#00320F]"}
              `}
            onClick={() => handleToggleChallenge(challenge.id)}
          >
            <div className="w-[30px] h-[30px] rounded-full text-center">
              <Image
                src={challenge.image}
                alt={challenge.label}
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <label className="w-full font-bold text-[12px]">
              <input
                type="checkbox"
                checked={selected.includes(challenge.id)}
                onChange={() => handleToggleChallenge(challenge.id)}
                className="hidden"
              />
              <div className="flex flex-col text-center font-semibold text-[18px] gap-[10px] cursor-pointer">
                <p>{challenge.label}</p>
                <p>{challenge.label2}</p>
              </div>
            </label>
            <div
              className={`px-[15px] py-[4px] flex items-center justify-center rounded-3xl transition-colors
                ${
                  selected.includes(challenge.id)
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }
              `}
            >
              <Check />
            </div>
          </div>
        ))}
      </div>
      <BlackAutoWidthButton
        className="px-4 py-3 bg-[#0D9C36]"
        text="챌린지 인증하기"
        type="submit"
        onClick={() => {}}
      />
    </form>
  );
};
