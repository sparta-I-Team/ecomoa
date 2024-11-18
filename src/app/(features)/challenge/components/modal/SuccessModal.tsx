import Image from "next/image";
import { CHALLENGES } from "@/utlis/challenge/challenges";

interface SuccessModalProps {
  onClose: () => void;
  selectedChallenges: string[];
}

const SuccessModal = ({ onClose, selectedChallenges }: SuccessModalProps) => {
  return (
    <div className="flex flex-col items-center relative w-full md:w-[585px] min-h-[280px] md:min-h-[300px]">
      <button
        onClick={onClose}
        className="absolute top-2 md:top-4 right-2 md:right-4 p-2 border-none rounded-full hover:bg-gray-100 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-600 md:w-6 md:h-6"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <figure className="block w-full">
        <Image
          src="/images/complete.png"
          alt="챌린지 완료 이미지"
          width={615}
          height={422}
          className="rounded-xl w-full h-auto"
          priority
        />
      </figure>

      <div className="flex flex-col justify-center items-center gap-4 md:gap-[30px] mt-6 md:mt-[40px]">
        <h2 className="text-lg md:text-[24px] font-semibold text-center">
          챌린지 인증 완료했어요!
        </h2>
        <p className="text-lg md:text-[24px] font-semibold text-center">
          총{" "}
          <span className="text-[#0D9C36]">
            {selectedChallenges.length * 100}
          </span>
          P를 모았어요!
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-4 w-full p-4 md:p-6">
        {CHALLENGES.filter((c) => selectedChallenges.includes(c.id)).map(
          (ch) => (
            <div
              key={ch.id}
              className="rounded-full bg-[#0D9C36] px-3 py-1.5 md:p-2 text-xs md:text-sm text-white shadow-sm whitespace-nowrap"
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
