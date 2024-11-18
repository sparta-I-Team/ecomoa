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
    <div className="flex flex-col w-full md:w-[585px] h-full md:h-[300px] p-[32px]">
      <div className="flex flex-col justify-center mb-[60px]">
        <figure className="mx-auto mb-[30px] mt-[26px] md:mt-0">
          <Image
            src="/images/gobackImage.png"
            alt="뒤로가기 이미지"
            width={60}
            height={60}
          />
        </figure>
        <div className="flex flex-col font-semibold text-[18px] md:text-[22px] justify-center items-center gap-[14px] md:gap-[30px]">
          <p>
            {isEditMode
              ? "수정을 취소하시겠습니까?"
              : "챌린지 인증을 취소하겠습니까?"}
          </p>
          <p className="text-[#1F2937]">
            {isEditMode ? (
              "수정중인 내용은 저장되지 않습니다."
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-0">
                <div className="flex flex-row gap-[4px]">
                  <span>지금 인증하면</span>

                  <p>
                    <span className="font-bold text-[#0D9C36]">{point}P</span>를
                    받을 수
                  </p>
                </div>

                <p className="mt-[14px] md:mt-0 md:ml-[4px]">있어요!</p>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full h-[60px] gap-3 justify-between mt-[68px] md:mt-0">
        <button
          className="flex-1 bg-[#E8F3E8] py-[22px] md:py-0 rounded-full text-[#525660] border-none items-center justify-center leading-none h-[60px]"
          onClick={onGoBack}
        >
          다음에 인증할게요
        </button>
        <button
          className="flex-1 bg-[#0D9C36] py-[22px] md:py-0 rounded-full text-white border-none items-center justify-center leading-none h-[60px]"
          onClick={onClose}
        >
          계속 작성할게요
        </button>
      </div>
    </div>
  );
};

export default GoBackModal;
