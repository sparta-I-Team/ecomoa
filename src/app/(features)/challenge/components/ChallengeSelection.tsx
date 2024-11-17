import { useForm } from "react-hook-form";
import { useState } from "react";
import { useChallengeStore } from "@/zustand/challengeStore";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { CHALLENGES } from "@/utlis/challenge/challenges";
import { Check } from "lucide-react";
import Image from "next/image";
import { useChallengeDashboard } from "@/hooks/useChallengeDashboard";
import { userStore } from "@/zustand/userStore";
import ChallengeSelectionSkeleton from "./ui/ChallengeSelectionSkeleton";

export const ChallengeSelection = () => {
  const { handleSubmit } = useForm();
  const { setStep, setSelectedChallenges } = useChallengeStore();
  const [selected, setSelected] = useState<string[]>([]);
  const { user } = userStore();
  const { isLoading } = useChallengeDashboard(user.id);
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

  if (isLoading) return <ChallengeSelectionSkeleton />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[100px] md:mt-[76px]">
      <h1 className="font-semibold text-[16px] ">데일리 탄소 절감 챌린지</h1>
      <div className="flex flex-col md:flex-row gap-[12px] pt-4">
        {CHALLENGES.map((challenge) => (
          <div
            key={challenge.id}
            className={`flex flex-row md:flex-col w-full md:w-[190px] md:h-[232px] justify-around items-center px-4 py-4 border rounded-3xl c ursor-pointer
              ${selected.includes(challenge.id) && " border-[#00320F]"}
              `}
            onClick={() => handleToggleChallenge(challenge.id)}
          >
            <div className=" w-[30px] h-[30px] rounded-full text-center">
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
              <div className="flex flex-col pl-[24px] md:p-0 md:text-center font-semibold text-[16px] md:text-[18px] gap-[10px] cursor-pointer">
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
        className="mt-[20px] md:mt-[40px] px-4 py-3 bg-[#0D9C36]"
        text="챌린지 인증하기"
        type="submit"
        onClick={() => {}}
      />
    </form>
  );
};
