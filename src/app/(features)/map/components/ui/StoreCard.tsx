import { Store } from "@/types/map";
import { useModalStore } from "@/zustand/modalStore";
import React from "react";
import SaveStoreModal from "../../modal/SavaStoreModal";
import { useBookmark } from "@/hooks/useBookmark";

interface Props {
  store: Store;
  selectedStoreId: string | null;
  onClick: (store: Store) => void;
}

const StoreCard = ({ store, selectedStoreId, onClick }: Props) => {
  const { openModal, closeModal } = useModalStore();
  const { isBookmarked, handleToggleBookmark } = useBookmark(store.store_id);

  const handleSaveStore = async (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark();
    openModal({
      type: "custom",
      content: (
        <SaveStoreModal
          onViewSaved={() => {
            closeModal();
          }}
        />
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
          className={`w-[80px] h-[32px] text-white ${
            isBookmarked ? "bg-[#03551a]" : "bg-[#0D9C36]"
          } rounded-[32px] text-[12px] flex justify-center items-center`}
          onClick={handleSaveStore}
        >
          {isBookmarked ? "저장됨" : "저장하기"}
        </button>
        <button className="h-[32px] p-3 text-white bg-[#00691E] rounded-[32px] text-[12px] whitespace-nowrap flex justify-center items-center">
          다녀온 가게
        </button>
      </div>
    </div>
  );
};

export default StoreCard;
