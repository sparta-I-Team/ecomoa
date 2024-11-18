import Image from "next/image";

interface AlreadySubmittedModalProps {
  onGoBack: () => void;
}

const AlreadySubmittedModal = ({ onGoBack }: AlreadySubmittedModalProps) => {
  return (
    <div className="flex flex-col w-full md:w-[585px] h-[300px] p-6">
      <div className="flex flex-col justify-center mb-[30px]">
        <figure className="mx-auto mb-[30px]">
          <Image
            src="/images/gobackImage.png"
            alt="뒤로가기 이미지"
            width={60}
            height={60}
          />
        </figure>
        <div className="flex flex-col font-semibold text-[22px] justify-center items-center gap-[30px] mt-[30px]">
          <p>오늘은 이미 챌린지에 참여하셨습니다.</p>
          <p className="text-[#1F2937]">내일 다시 도전해주세요! 🌱</p>
        </div>
      </div>
      <div className="flex w-full h-[60px] gap-3">
        <button
          className="w-full bg-[#0D9C36] rounded-full text-white border-none items-center justify-center leading-none h-[60px]"
          onClick={onGoBack}
        >
          다음에 인증하기
        </button>
      </div>
    </div>
  );
};

export default AlreadySubmittedModal;
