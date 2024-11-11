import { Store } from "@/types/map";
import React from "react";

interface Props {
  store: Store;
  selectedStoreId: string | null;
  onClick: (store: Store) => void;
}

const StoreCard = ({ store, selectedStoreId, onClick }: Props) => {
  return (
    <div
      key={store.store_id}
      onClick={() => onClick(store)}
      className={`p-4 h-[100px] border rounded-lg cursor-pointer transition-colors ${
        selectedStoreId === store.store_id
          ? "bg-green-50 border-green-500"
          : "hover:bg-gray-50"
      }`}
    >
      <h3 className="font-bold text-gray-800 mb-[10px]">{store.store_name}</h3>
      <p className="text-sm text-gray-600 ">{store.road_address}</p>
      <p className="text-sm text-gray-500 truncate">{store.operating_hours}</p>
    </div>
  );
};

export default StoreCard;
