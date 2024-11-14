import Image from "next/image";

interface GoBackModalProps {
  onClose: () => void;
  onGoBack: () => void;
  point: number;
  isEditMode?: boolean;
}

const GoBackModal = ({
  onClose,
  onGoBack,
  point,
  isEditMode = false
}: GoBackModalProps) => {
  return (
    <div className="flex flex-col w-[585px] h-[300px] p-6">
      <div className="flex flex-col justify-center mb-[60px]">
        <figure className="mx-auto mb-[30px]">
          <Image
            src="/images/gobackImage.png"
            alt="뒤로가기 이미지"
            width={60}
            height={60}
          />
        </figure>
        <div className="flex flex-col font-semibold text-[22px] justify-center items-center gap-[30px]">
          <p>
            {isEditMode
              ? "수정을 취소하시겠습니까?"
              : "챌린지 인증을 취소하겠습니까?"}
          </p>
          <p className="text-[#1F2937]">
            {isEditMode ? (
              "수정중인 내용은 저장되지 않습니다."
            ) : (
              <>
                지금 인증하면
                <span className="font-bold text-[#0D9C36]">{point}P</span>를
                받을 수 있어요!
              </>
            )}
          </p>
        </div>
      </div>
      <div className="flex w-full h-[60px] gap-3 justify-between">
        <button
          className="flex-1 bg-[#E8F3E8] rounded-full text-[#525660] border-none items-center justify-center leading-none h-[60px]"
          onClick={onGoBack}
        >
          다음에 인증할게요
        </button>
        <button
          className="flex-1 bg-[#0D9C36] rounded-full text-white border-none items-center justify-center leading-none h-[60px]"
          onClick={onClose}
        >
          계속 작성할게요
        </button>
      </div>
    </div>
  );
};

export default GoBackModal;
