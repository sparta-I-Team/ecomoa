// page.tsx
import { Suspense } from "react";
import MapLeftAreaSkeleton from "./components/ui/MapLeftAreaSkeleton";
import MapSkeleton from "./components/ui/MapSkeleton";
import { getStoreList } from "@/api/mapApi";
import MapClient from "./components/ui/MapClient";

async function Page() {
  const initialStores = await getStoreList();

  return (
    <div className="bg-[#F2F9F2] pb-[48px]">
      <div className="flex flex-col w-[1200px] mx-auto">
        <div className="p-2 mt-[50px] mb-[60px]">
          <h1 className="font-bold text-[26px]">
            내 주변 친환경 가게를 방문해 보세요
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-row">
              <MapLeftAreaSkeleton />
              <MapSkeleton />
            </div>
          }
        >
          <MapClient initialStores={initialStores} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
