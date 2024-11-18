import { Suspense } from "react";
import MapLeftAreaSkeleton from "./components/ui/MapLeftAreaSkeleton";
import MapSkeleton from "./components/ui/MapSkeleton";
import { getStoreList } from "@/api/mapApi";
import MapClient from "./components/ui/MapClient";

async function Page() {
  const initialStores = await getStoreList();

  return (
    <div className="md:bg-[#F2F9F2] pt-[36px] md:pt-[52px] pb-[48px]">
      <div className="w-full max-w-full md:max-w-[1200px] mx-auto md:px-6">
        <Suspense
          fallback={
            <div className="w-full max-w-[1200px] mx-auto md:px-6">
              <div className="mb-6 md:mb-[60px]">
                <div className="h-7 md:h-[30px] bg-gray-200 rounded w-[380px] md:w-[400px] animate-pulse" />
              </div>
              <div className="flex flex-col-reverse md:flex-row w-full gap-4 md:gap-[30px]">
                <MapLeftAreaSkeleton />
                <MapSkeleton />
              </div>
            </div>
          }
        >
          <div className=" mb-6 md:mb-[60px]">
            <h1 className="pl-[20px] md:pl-0 font-bold text-[20px] md:text-[26px]">
              내 주변 친환경 가게를 방문해 보세요
            </h1>
          </div>

          <MapClient initialStores={initialStores} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
