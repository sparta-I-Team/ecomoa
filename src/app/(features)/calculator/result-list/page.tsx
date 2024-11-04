"use client";
import { loadMyAllData } from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import React, { useEffect, useState } from "react";

const ResultListPage = () => {
  const [myAllData, setMyAllData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    loadMyAllData(setMyAllData);
  }, []);

  return (
    <>
      <div>
        <div> &lt; 나의 탄소 배출량 히스토리</div>
        <div className="text-[#32343a] text-3xl font-semibold mb-[28px]">
          나의 탄소 배출량 히스토리
        </div>
        <div className="text-[#18191d] text-xl font-normal font-['Wanted Sans'] mb-[80px]">
          지금까지의 나의 탄소 배출량 데이터를 확인해봅시다{" "}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div>탄소 배출량 계산 결과표</div>
          <div> {myAllData ? `${myAllData.length}건` : "0건"}</div>
        </div>
        <div>2024년</div>
      </div>
      <div>
        {myAllData && myAllData.length > 0 ? (
          myAllData
            .sort((a, b) => {
              // 연도가 같으면 월로 비교
              if (a.year === b.year) {
                return b.month - a.month;
              }
              return b.year - a.year;
            })
            .map((data, index) => (
              <div
                key={index}
                className="w-[1128px] h-[120px] border border-black"
              >
                <div>
                  {data.year}년 {data.month}월
                </div>
                <div>탄소 배출량 계산 결과표</div>
              </div>
            ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default ResultListPage;
