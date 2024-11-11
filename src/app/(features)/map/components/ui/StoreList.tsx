"use client";
import { Store } from "@/types/map";
import { useState, useEffect, ChangeEvent } from "react";
import StoreCard from "./StoreCard";

interface StoreListProps {
  stores: Store[];
  onClick: (store: Store) => void;
  selectedStoreId: string | null;
}

const StoreList = ({ stores, onClick, selectedStoreId }: StoreListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const filteredStores = stores.filter(
    (store) =>
      store.store_name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      store.road_address
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="p-2 mb-4">
        <input
          type="text"
          placeholder="가게 이름 또는 주소 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredStores.map((store) => (
          <StoreCard
            key={store.store_id}
            store={store}
            selectedStoreId={selectedStoreId}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
