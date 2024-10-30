"use client";
import { useEffect, useState } from "react";

import {
  // currentMonthly,
  MonthlyData,
  totalCurrentMonthly
} from "@/types/calculate";
import { loadTotalUsersData, loadUserAndFetchData } from "@/hooks/monthlyData";
import MonthlyChart from "../components/MonthlyChart";
import ThisMonthChart from "../components/ThisMonthChart";
import YearMonthPicker from "../components/YearMonthPicker";

const ResultPage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [currentMonthly, setCurrentMonthly] = useState<MonthlyData | null>(
    null
  ); // MonthlyData 타입으로 설정

  const [totalCurrentMonthly, setTotalCurrentMonthly] =
    useState<totalCurrentMonthly | null>(null);

  useEffect(() => {
    loadUserAndFetchData(setUser, setCurrentMonthly);
    loadTotalUsersData(setTotalCurrentMonthly);
  }, []);
  // console.log(totalCurrentMonthly);

  return (
    <div>
      <div>탄소 계산 히스토리</div>
      <div className="border border-red-400 p-10 w-[1055px] h-[700px]">
        <div className="flex flex-row justify-center gap-20">
          <div>
            <div className="flex justify-center">
              <YearMonthPicker
                disabled={true}
                onChangeYear={() => {}}
                onChangeMonth={() => {}}
              />
            </div>
            <div>이번 달 배출량</div>
            <div className=" w-[350px] h-[200px]">
              <ThisMonthChart
                currentMonthly={currentMonthly}
                totalCurrentMonthly={totalCurrentMonthly}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div>이번달 총 탄소 배출량</div>
            <div>{currentMonthly?.carbon_emissions}kg</div>
            <div>평균 대비 12% 높은 배출량</div> {/* 해당부분 구현 예정 */}
          </div>
        </div>
        <div className="flex">
          <div className="bg-red-300 w-[200px] h-[180px]"></div>
          <div className="flex flex-col justify-center text-center">
            <div>{user} 님의 11월 탄소배출량은 지난달보다 00% 감소했어요! </div>
            <div>그래도 아직 평균에 비해 조금 많은 탄소를 배출하고 있어요.</div>
            <div>다음달에는 더 노력해보아요.</div>
          </div>
        </div>
      </div>

      <div className="border border-red-400 p-10 mt-10">
        <div>항목 별 탄소 배출량</div>
        <MonthlyChart currentMonthly={currentMonthly} />
      </div>
      <div className="border border-red-400 p-10 mt-10">
        <div>
          <div>전기</div>
          <div className="flex justify-center gap-8">
            <div className="flex w-[500px] h-[100px] bg-slate-400">
              <div>사용량</div>
              <div>{currentMonthly?.electricity_usage}kg</div>
            </div>
            <div className="flex w-[500px] h-[100px] bg-slate-200">
              <div>co2 배출량</div>
              <div>{currentMonthly?.electricity_co2}kg</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-red-400 p-10 mt-10">
        <div>일상 속 에너지 절약법</div>
        <div className="w-[1057px] h-[100px] border border-red-300 flex justify-center items-center text-center">
          전기 밥솥 보온 기능을 꺼두기
        </div>
      </div>

      <div className="flex flex-col gap-4 m-10">
        <button>이미지로 저장</button>
        <button>닫기</button>
      </div>
    </div>
  );
};

export default ResultPage;
