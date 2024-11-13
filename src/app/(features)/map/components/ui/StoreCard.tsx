import { Store } from "@/types/map";
import { useModalStore } from "@/zustand/modalStore";
import Image from "next/image";
import React from "react";

interface Props {
  store: Store;
  selectedStoreId: string | null;
  onClick: (store: Store) => void;
}

const StoreCard = ({ store, selectedStoreId, onClick }: Props) => {
  const { openModal, closeModal } = useModalStore();

  const handleSaveStore = () => {
    openModal({
      type: "custom",
      content: (
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
                <span className="text-[#00691E]">위치</span> 친환경 가게 Map{" "}
                {">"} 저장한 가게
              </p>
            </div>
          </div>
          <button className="text-[16px] text-white font-bold p-6 w-[513px] rounded-full bg-[#0D9C36] mt-[46px] mb-[32px]">
            저장한 가게 보러가기
          </button>
        </div>
      )
    });
  };
  return (
    <div
      key={store.store_id}
      onClick={() => onClick(store)}
      className={`flex flex-col justify-between p-8 w-[356px] h-[223px] border rounded-lg cursor-pointer transition-colors ${
        selectedStoreId === store.store_id
          ? "bg-[#CBF5CB] border-[#0D9C36]"
          : "hover:bg-gray-50 bg-white "
      }`}
    >
      <div className="flex flex-col gap-[12px]">
        <h3 className="font-bold text-gray-800 mb-[10px]">
          {store.store_name}
        </h3>
        <p className="text-sm text-gray-600 ">{store.road_address}</p>
        <p className="text-sm text-gray-500 truncate">
          {store.operating_hours}
        </p>
      </div>
      <div className="flex flex-row gap-[8px] justify-end">
        <button
          className="p-3 text-white bg-[#0D9C36] rounded-[32px] text-[14px]"
          onClick={handleSaveStore}
        >
          저장하기
        </button>
        <button className="p-3 text-white bg-[#00691E] rounded-[32px] text-[14px]">
          다녀온 가게
        </button>
      </div>
    </div>
  );
};

export default StoreCard;
