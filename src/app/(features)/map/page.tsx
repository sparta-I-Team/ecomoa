"use client";
import { Store } from "@/types/map";
import { useState } from "react";
import KakaoMap from "./components/kakaoMap";
import StoreList from "./components/ui/StoreList";
import StoreSkeleton from "./components/ui/StoreSkeleton";
import MapSkeleton from "./components/ui/MapSkeleton";
import { useStoreList } from "@/hooks/useMap";

const Page = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const { data: storeList, isLoading, error } = useStoreList();

  const handleStoreClick = (store: Store) => {
    setSelectedStoreId(store.store_id);
  };

  if (error) {
    return <div>데이터를 패치 오류</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-row w-[1200px] mx-auto h-screen border border-gray-500">
        <div className="w-1/3 border-r">
          <StoreSkeleton />
        </div>
        <MapSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-row w-[1200px] mx-auto h-screen border border-gray-500">
      <div className="w-1/3 border-r">
        <StoreList
          stores={storeList || []}
          onClick={handleStoreClick}
          selectedStoreId={selectedStoreId}
        />
      </div>
      <KakaoMap
        storeList={storeList || []}
        selectedStoreId={selectedStoreId}
        onClick={handleStoreClick}
      />
    </div>
  );
};

export default Page;
