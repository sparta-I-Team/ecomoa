"use client";
import { Store } from "@/types/map";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  storeList: Store[];
  selectedStoreId: string | null;
  onClick: (store: Store) => void;
}

const KakaoMap = ({ storeList, selectedStoreId, onClick }: KakaoMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(8);
  const mapRef = useRef<kakao.maps.Map>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedStoreId || !storeList) return;

    const selectedStore = storeList.find(
      (store) => store.store_id === selectedStoreId
    );

    if (!selectedStore) return;

    const moveLatLng = new kakao.maps.LatLng(
      selectedStore.lat,
      selectedStore.lon
    );
    mapRef.current.setCenter(moveLatLng);
    setLevel(3);
  }, [selectedStoreId, storeList]);

  return (
    <div className="w-2/3 h-screen">
      {isMapLoaded && (
        <Map
          ref={mapRef}
          center={{
            lat: 37.566826,
            lng: 126.978656
          }}
          style={{
            width: "100%",
            height: "100%"
          }}
          level={level}
          draggable={true}
          zoomable={true}
          onZoomChanged={(map) => setLevel(map.getLevel())}
        >
          {level <= 5 &&
            storeList?.map((store) => (
              <MapMarker
                key={store.store_id}
                position={{ lat: store.lat, lng: store.lon }}
                onClick={() => onClick(store)}
                // image={{
                //   src:
                //     selectedStoreId === store.store_id
                //       ? "선택된 마커 이미지로 넣음녀 됨"
                //       : "기본 마커",
                //   size: {
                //     width: 24,
                //     height: 35
                //   }
                // }}
              >
                {selectedStoreId === store.store_id && (
                  <div className="p-2 w-[280px]" style={{ border: "none" }}>
                    <div className="mb-2 pb-2 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800 break-words">
                        {store.store_name}
                      </h3>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-gray-600 break-words whitespace-pre-wrap">
                        {store.road_address}
                      </div>
                      <div className="text-gray-500 break-words whitespace-pre-wrap">
                        {store.operating_hours}
                      </div>
                      <div className="text-gray-500 break-words whitespace-pre-wrap">
                        {store.contact_number}
                      </div>
                    </div>
                  </div>
                )}
              </MapMarker>
            ))}
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;
