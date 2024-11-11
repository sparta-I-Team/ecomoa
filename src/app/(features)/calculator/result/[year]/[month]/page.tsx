"use client";
import { useEffect, useState } from "react";

import { loadTotalUsersData, loadUserAndFetchData } from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import ThisMonthChart from "../../../components/ThisMonthChart";
import SectionCard from "../../../components/SectionCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import TipCard from "../../../components/TipCard";
import Loading from "../../../components/Loading";

const currentMonth = new Date().getMonth() + 1;
const MIN_LOADING_TIME = 3000; // 최소 로딩 시간 (3초)

const ResultPage: React.FC = () => {
  const [currentData, setCurrentData] = useState<MonthlyData | null>(null);
  const [totalAvgData, setTotalAvgData] = useState<MonthlyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const year = params.year;
  const month = params.month;

  // 나와 유저들의 data
  useEffect(() => {
    if (year && month) {
      const fetchStartTime = Date.now();

      Promise.all([
        loadUserAndFetchData(Number(year), Number(month), setCurrentData),
        loadTotalUsersData(Number(year), Number(month), setTotalAvgData)
      ])
        .then(() => {
          const timeElapsed = Date.now() - fetchStartTime;
          const remainingTime = MIN_LOADING_TIME - timeElapsed;

          if (remainingTime > 0) {
            setTimeout(() => setIsLoading(false), remainingTime);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("데이터 로드 실패:", error);
          setIsLoading(false);
        });
    }
  }, [year, month]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="w-[1200px] mx-auto">
        <div className="mt-[76px] mb-[80px]">
          <Link href="/calculator/calculate">
            <p className="text-[16px]"> &lt; 탄소 계산기</p>
          </Link>
          <div className="w-full h-[1px] bg-gray-300 my-4 mb-[36px]"></div>
          <p className="text-[#32343a] text-[30px] font-semibold mb-[28px]">
            탄소 배출량 계산 결과표
          </p>
          <p className=" text-[20px] font-normal text-[#00691E]">
            이번 달 이산화탄소 배출량이 얼마나 발생했을지 확인해봅시다
          </p>
        </div>
        <div>
          {/* 첫번째 section */}
          <div className="flex w-full h-[400px] rounded-[40px] justify-between items-center bg-[#00320F] px-[80px] mb-[140px]">
            <div className="flex flex-row ml-[42px]">
              <div className="flex flex-col">
                <div className="text-[36px] font-bold text-white mb-[36px]">
                  {month !== null && currentMonth !== null
                    ? Number(month) === currentMonth
                      ? "이번 달"
                      : `${month}월`
                    : ""}{" "}
                  총 탄소 배출량은
                </div>
                <div className="text-[#FFD64E] text-[48px] font-semibold mb-[40px]">
                  {currentData?.carbon_emissions}kg
                </div>
                <div className="text-[16px] text-white">
                  탄소 배출량이 평균 보다{" "}
                  {totalAvgData && currentData ? (
                    currentData.carbon_emissions <
                    totalAvgData.carbon_emissions ? (
                      <>
                        {(
                          100 -
                          (currentData.carbon_emissions /
                            totalAvgData.carbon_emissions) *
                            100
                        ).toFixed(2)}{" "}
                        % 낮아요!
                      </>
                    ) : (
                      <>
                        {(
                          (currentData.carbon_emissions /
                            totalAvgData.carbon_emissions) *
                            100 -
                          100
                        ).toFixed(2)}{" "}
                        % 높아요!
                      </>
                    )
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-[280px] h-[280px] flex justify-center items-center bg-white rounded-[24px]">
              <ThisMonthChart
                currentData={currentData}
                totalAvgData={totalAvgData}
              />
            </div>
          </div>
        </div>
        {/* 두번째 섹션 데이터 제공 */}
        <p className="text-[24px] font-semibold mb-[32px]">
          항목 별 탄소 배출량
        </p>
        <div className="flex flex-wrap justify-between mb-[140px]">
          <SectionCard
            logo={"/calculate/electricity_color.svg"}
            title={"전기"}
            usageValue={currentData?.electricity_usage}
            co2Value={currentData?.electricity_co2}
            unit="kwh/월"
          />
          <SectionCard
            logo={"/calculate/water_color.svg"}
            title={"수도"}
            usageValue={currentData?.water_usage}
            co2Value={currentData?.water_co2}
            unit="m³/월"
          />
          <SectionCard
            logo={"/calculate/gas_color.svg"}
            title={"가스"}
            usageValue={currentData?.gas_usage}
            co2Value={currentData?.gas_co2}
            unit="m³/월"
          />
          <SectionCard
            logo={"/calculate/car_color.svg"}
            title={"교통"}
            usageValue={currentData?.car_usage}
            co2Value={currentData?.car_co2}
            unit="km/월"
          />
          <SectionCard
            logo={"/calculate/waste_color.svg"}
            title={"폐기물"}
            usageValue={currentData?.waste_volume}
            co2Value={currentData?.waste_co2}
            unit="Kg/월"
          />
        </div>
        <div>
          <p className="text-[24px] font-semibold mb-[32px]">
            일상 속 에너지 절약법
          </p>
          <div className="flex flex-col gap-3 mb-[48px]">
            <TipCard
              tipLogo={"/calculate/electricity_white.svg"}
              tipTitle={"LED 조명으로 교체하기"}
              tipContent={
                "LED는 기존 전구보다 전력 소모가 적어 전기 절약 효과가 큽니다."
              }
            />
            <TipCard
              tipLogo={"/calculate/gas_white.svg"}
              tipTitle={"겨울철 실내 온도 낮추기"}
              tipContent={
                "난방 온도를 조금만 낮추고,담요나 양말을 활용해 따뜻함을 유지해 보세요."
              }
            />
            <TipCard
              tipLogo={"/calculate/water_white.svg"}
              tipTitle={"세탁물 모아서 한 번에 세탁하기"}
              tipContent={
                "세탁기물을 한 번에 모아서 사용해 물과 전기를 함께 절약하세요."
              }
            />
            <TipCard
              tipLogo={"/calculate/car_white.svg"}
              tipTitle={"출퇴근 카풀하기"}
              tipContent={
                "같은 방향으로 가는 사람들과 차를 함께 타면 연료와 교통비를 아낄 수 있어요."
              }
            />
            <TipCard
              tipLogo={"/calculate/waste_white.svg"}
              tipTitle={"텀블러와 에코백 사용하기"}
              tipContent={
                "일회용 컵과 비닐봉투 대신 텀블러와 에코백을 사용해 폐기물을 줄여보세요."
              }
            />
          </div>
        </div>
        <div>
          <button className="w-[380px] h-[60px] px-8 bg-[#E8F3E8] text-[#A1A7B4] rounded-[85px] text-[18px] font-semibold border-none hover:bg-[#0D9C36] hover:text-white">
            <div className="grow shrink basis-0 text-center">이미지로 저장</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
