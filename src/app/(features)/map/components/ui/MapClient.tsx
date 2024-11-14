// components/MapClient.tsx
"use client";

import { Store } from "@/types/map";
import { useState } from "react";
import { Modal } from "@/components/shared/Modal";
import { useStoreList } from "@/hooks/useMap";
import KakaoMap from "../kakaoMap";
import MapLeftArea from "../MapLeftArea";

interface Props {
  initialStores: Store[];
}

export default function MapClient({ initialStores }: Props) {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  
  const { data: storeList = initialStores, error } = useStoreList();

  const handleStoreClick = (store: Store) => {
    if (selectedStoreId === store.store_id) {
      setSelectedStoreId(null);
      return;
    }
    setSelectedStoreId(store.store_id);
  };

  if (error) {
    return <div>데이터를 패치 오류</div>;
  }

  return (
    <div className="flex flex-row">
      <MapLeftArea
        stores={storeList}
        onClick={handleStoreClick}
        selectedStoreId={selectedStoreId}
      />
      <KakaoMap
        storeList={storeList}
        selectedStoreId={selectedStoreId}
        onClick={handleStoreClick}
      />
      <Modal />
    </div>
  );
}