import Image from "next/image";
import { CHALLENGES } from "@/utlis/challenge/challenges";

interface SuccessModalProps {
  onClose: () => void;
  selectedChallenges: string[];
}

const SuccessModal = ({ onClose, selectedChallenges }: SuccessModalProps) => {
  return (
    <div className="flex flex-col items-center w-[585px] relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 border-none rounded-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-600"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <figure className="block">
        <Image
          src="/images/complete.png"
          alt="챌린지 완료 이미지"
          width={615}
          height={422}
          className="rounded-xl"
        />
      </figure>
      <div className="flex flex-col justify-center items-center gap-[30px] mt-[40px]">
        <h2 className="text-[24px] font-semibold">챌린지 인증 완료했어요!</h2>
        <p className="text-[24px] font-semibold">
          총{" "}
          <span className="text-[#0D9C36]">
            {selectedChallenges.length * 100}
          </span>
          P를 모았어요!
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-4 w-full p-6">
        {CHALLENGES.filter((c) => selectedChallenges.includes(c.id)).map(
          (ch) => (
            <div
              key={ch.id}
              className="rounded-full bg-[#0D9C36] p-2 text-sm text-white shadow-sm whitespace-nowrap"
              title={ch.label}
            >
              {ch.label}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
