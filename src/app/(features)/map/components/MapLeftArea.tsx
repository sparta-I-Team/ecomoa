"use client";
import { SortType, Store } from "@/types/map";
import { useState, useEffect, ChangeEvent } from "react";
import StoreCard from "./ui/StoreCard";
import { Check, Search } from "lucide-react";

interface StoreListProps {
  stores: Store[];
  onClick: (store: Store) => void;
  selectedStoreId: string | null;
}

const MapLeftArea = ({ stores, onClick, selectedStoreId }: StoreListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortType, setSortType] = useState<SortType>(null);
  const [activeTab, setActiveTab] = useState("recommended");

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

  const handleSortClick = (type: SortType) => {
    setSortType(sortType === type ? null : type);
  };

  const TABS = [
    { id: "recommended", label: "추천 가게" },
    { id: "saved", label: "저장한 가게" },
    { id: "visited", label: "다녀온 가게" }
  ];

  return (
    <div className="min-w-[380px] h-[822px] flex flex-col">
      <nav className="relative mb-[24px]">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium relative border-none 
          ${
            activeTab === tab.id
              ? "text-[#00320F] font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }
        `}
            >
              {tab.label}
              <div
                className={`
            absolute bottom-0 left-0 w-full h-[2px] 
            transition-colors duration-300 ease-in-out
            ${activeTab === tab.id ? "bg-[#00320F]" : "bg-gray-200"}
          `}
              />
            </button>
          ))}
        </div>
      </nav>

      <div className="p-2 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="친환경 카페를 검색해 보세요"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#D7E8D7] h-[52px] text-[14px] pl-[20px] pr-12 border-none rounded-[40px] focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={24} />
          </div>
        </div>
      </div>

      <div className="flex h-[20px] flex-row gap-[24px] text-[14px] p-2 items-center mb-[4px]">
        <p className="w-[40px] font-bold text-[#00691E]">{filteredStores.length}건</p>
        <button
          onClick={() => handleSortClick("distance")}
          className={`border-none flex items-center gap-[2px] transition-colors
            ${
              sortType === "distance" ? "text-black font-bold" : "text-gray-300"
            }
          `}
        >
          {sortType === "distance" && (
            <Check size={16} className="text-black font-bold" />
          )}
          가까운순
        </button>
        <button
          onClick={() => handleSortClick("popularity")}
          className={`border-none flex items-center gap-[2px] transition-colors
            ${
              sortType === "popularity"
                ? "text-black font-bold"
                : "text-gray-300"
            }
          `}
        >
          {sortType === "popularity" && (
            <Check size={16} className="text-black font-bold" />
          )}
          인기순
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
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

export default MapLeftArea;
