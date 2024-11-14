// components/modals/store/SaveStoreModal.tsx
import Image from "next/image";
import { useModalStore } from "@/zustand/modalStore";

interface SaveStoreModalProps {
  onViewSaved?: () => void; // 저장한 가게 보러가기 클릭 핸들러
}

const SaveStoreModal = ({ onViewSaved }: SaveStoreModalProps) => {
  const { closeModal } = useModalStore();

  return (
    <div className="flex flex-col items-center w-[585px] relative">
      <button
        onClick={closeModal}
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
          src="/images/save.png"
          alt="챌린지 완료 이미지"
          width={585}
          height={341}
          className="rounded-xl"
        />
      </figure>
      <div className="flex flex-col justify-center items-center gap-[28px] mt-[54px]">
        <h2 className="text-[24px] font-semibold">저장했어요</h2>
        <div className="p-3 rounded bg-gray-200 text-[14px]">
          <p>
            <span className="text-[#00691E]">위치</span> 친환경 가게 Map {">"}{" "}
            저장한 가게
          </p>
        </div>
      </div>
      <button
        onClick={onViewSaved}
        className="text-[16px] text-white font-bold p-6 w-[513px] rounded-full bg-[#0D9C36] mt-[46px] mb-[32px] hover:bg-[#0B8A2E] transition-colors"
      >
        저장한 가게 보러가기
      </button>
    </div>
  );
};

export default SaveStoreModal;
