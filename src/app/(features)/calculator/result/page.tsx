"use client";
import { useEffect, useState } from "react";

import { loadTotalUsersData, loadUserAndFetchData } from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import YearMonthPicker from "../components/YearMonthPicker";
import ThisMonthChart from "../components/ThisMonthChart";
import MonthlyChart from "../components/MonthlyChart";
import UsageCard from "../components/UsageCard";
import SectionCard from "../components/SectionCard";
import YearMonthPickerMain from "../components/YearMonthPickerMain";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const ResultPage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [thisYear, setThisYear] = useState<number | null>(currentYear);
  const [thisMonth, setThisMonth] = useState<number | null>(currentMonth);
  const [currentData, setCurrentData] = useState<MonthlyData | null>(null);
  const [totalAvgData, setTotalAvgData] = useState<MonthlyData | null>(null);
  const [lastData, setLastData] = useState<MonthlyData | null>(null);
  const [lastTotalAvgData, setLastTotalAvgData] = useState<MonthlyData | null>(
    null
  );

  // 내 이번달 저번달 / 전체유저 이번달 저번달 데이터 fetch 함수
  useEffect(() => {
    loadUserAndFetchData(setUser, thisYear, thisMonth, setCurrentData);
    loadTotalUsersData(thisYear, thisMonth, setTotalAvgData);

    // 이전 달의 데이터 로딩
    const previousYear = thisMonth === 1 ? thisYear - 1 : thisYear;
    const previousMonth = thisMonth === 1 ? 12 : thisMonth - 1;

    loadUserAndFetchData(setUser, previousYear, previousMonth, setLastData);
    loadTotalUsersData(previousYear, previousMonth, setLastTotalAvgData);
  }, [thisYear, thisMonth]);

  const handleYearChange = (year: number) => {
    setThisYear(year);
  };

  const handleMonthChange = (month: number) => {
    setThisMonth(month);
  };

  const handleCloseDropdown = () => {
    loadUserAndFetchData(setUser, thisYear, thisMonth, setCurrentData);
    loadTotalUsersData(thisYear, thisMonth, setTotalAvgData);
  };

  return (
    <>
      <div>탄소 배출량 계산하기</div>
      <div>이번 달 이산화탄소 배출량이 얼마나 발생했을지 계산해봅시다</div>
      <div className="flex flex-col justify-center items-center bg-[#EAFCDE] p-10 w-[1200px] rounded-[32px]">
        <div className="flex flex-col w-[400px] h-[60px] px-11 bg-[#aef480] rounded-[38px] justify-center items-center gap-2.5">
          <div className="flex justify-center items-center text-[#1c3d05] text-4xl font-semibold">
            <YearMonthPickerMain
              thisYear={thisYear}
              thisMonth={thisMonth}
              onChangeYear={handleYearChange} // 연도 변경 핸들러 전달
              onChangeMonth={handleMonthChange} // 월 변경 핸들러 전달
              onCloseDropdown={handleCloseDropdown} // 드롭다운 닫힘 시 호출될 함수
              disabled={false}
            />
          </div>
        </div>

        <div>이번 달 배출량</div>
        <div className="flex flex-col w-[1055px] h-full bg-white rounded-[20px] border border-[#5bca11]">
          <div className="flex justify-center items-center w-[1055px] gap-12">
            <div className="w-[500px] h-[300px] flex justify-center items-center">
              <ThisMonthChart
                currentData={currentData}
                totalAvgData={totalAvgData}
                lastData={lastData}
                lastTotalAvgData={lastTotalAvgData}
              />
            </div>
            <div className="h-[202px] border-l border-[#5bca11] mx-4"></div>

            <div className="flex flex-col justify-center text-center">
              <div>이번달 총 탄소 배출량</div>
              <div className="text-[#27affb] text-[64px] font-semibold">
                {currentData?.carbon_emissions}kg
              </div>
              <div>
                (평균 대비
                {(
                  (currentData?.carbon_emissions /
                    totalAvgData?.carbon_emissions) *
                  100
                ).toFixed(2)}
                % 높은 배출량)
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="bg-red-300 w-[200px] h-[180px]"></div>
            <div className="flex flex-col justify-center text-center">
              <div>
                {user} 님의 11월 탄소배출량은 지난달보다{" "}
                {lastData && currentData ? (
                  currentData.carbon_emissions < lastData.carbon_emissions ? (
                    <>
                      {(
                        100 -
                        (currentData.carbon_emissions /
                          lastData.carbon_emissions) *
                          100
                      ).toFixed(2)}{" "}
                      % 감소했어요!
                      <div>평소보다 탄소를 조금 배출하고 있어요.</div>
                      <div>다음달에도 이번달 처럼만 사용해주세요.</div>
                    </>
                  ) : (
                    <>
                      {(
                        (currentData.carbon_emissions /
                          lastData.carbon_emissions) *
                          100 -
                        100
                      ).toFixed(2)}{" "}
                      % 증가했어요!
                      <div>
                        그래도 아직 평균에 비해 조금 많은 탄소를 배출하고
                        있어요.
                      </div>
                      <div>다음달에는 더 노력해보아요.</div>
                    </>
                  )
                ) : (
                  "데이터가 부족합니다."
                )}
              </div>
            </div>
          </div>
        </div>
        <div>항목 별 탄소 배출량</div>
        <div className="flex flex-col w-[1055px] h-full bg-white rounded-[20px] border border-[#5bca11]">
          <MonthlyChart currentData={currentData} totalAvgData={totalAvgData} />
        </div>
      </div>
      <div className="flex flex-col">
        <SectionCard
          title={"전기"}
          usageValue={currentData?.electricity_usage}
          co2Value={currentData?.electricity_co2}
        />
        <SectionCard
          title={"수도"}
          usageValue={currentData?.water_usage}
          co2Value={currentData?.water_co2}
        />
        <SectionCard
          title={"가스"}
          usageValue={currentData?.gas_usage}
          co2Value={currentData?.gas_co2}
        />
        <SectionCard
          title={"교통"}
          usageValue={currentData?.car_usage}
          co2Value={currentData?.car_co2}
        />
        <SectionCard
          title={"폐기물"}
          usageValue={currentData?.waste_volume}
          co2Value={currentData?.waste_co2}
        />
      </div>
      <div>
        <div>일상 속 에너지 절약법</div>
        <div className="w-[1200px] h-[100px] p-2.5 bg-white rounded-[20px] border-2 border-[#8cd5fd] justify-center items-center gap-2.5 inline-flex">
          <div className="text-[#27affb] text-xl font-semibold">
            전기 밥솥 보온 기능 꺼두기
          </div>
        </div>
      </div>
      <button>이미지로 저장</button>
    </>
  );
};

export default ResultPage;
