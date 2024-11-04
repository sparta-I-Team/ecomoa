"use client";
import {
  loadMyAllData,
  loadTotalUsersData,
  loadUserAndFetchData
} from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import React, { useEffect, useState } from "react";
import CompareMonthlyEmissions from "../components/CompareMonthlyEmissions";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const ResultPageMain = () => {
  const [currentData, setCurrentData] = useState<MonthlyData | null>(null);
  const [totalAvgData, setTotalAvgData] = useState<MonthlyData | null>(null);
  const [myAllData, setMyAllData] = useState<MonthlyData[] | null>(null); // 배열로 변경

  useEffect(() => {
    loadUserAndFetchData(currentYear, currentMonth, setCurrentData);
    loadTotalUsersData(currentYear, currentMonth, setTotalAvgData);
    loadMyAllData(setMyAllData); // 이 함수가 MonthlyData 배열을 반환하도록 수정
  }, [currentYear, currentMonth]);

  console.log("myAllData => ", myAllData);
  return (
    <>
      <div>
        <div>나의 탄소 배출량 히스토리</div>
        <div>지금까지의 나의 탄소 배출량 데이터를 확인해봅시다</div>
      </div>

      {/* 나의 탄소 히스토리 최상단 데이터 */}
      <div className="flex flex-row w-full h-[140px] bg-[#F5F5F5] justify-between items-center">
        <div className="flex flex-row items-center ml-[72px]">
          <div className="w-[100px] h-[100px] bg-red-200"></div>
          <div className="ml-[31px]">
            <div>홍길동 님</div>
            <div>Lv1. 씨앗 모아</div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mr-[72px] w-[320px] h-[58px] bg-[#FFFFFF] gap-4">
          <div className="text-[18px] text-[#8B8B8B]">
            탄소 배출량 계산 결과표
          </div>
          <Link href="/calculator/result-list">
            <div className="text-[36px] font-semibold">
              {myAllData ? `${myAllData.length}건` : "0건"}
            </div>
          </Link>
        </div>
      </div>

      {/* 배출량 현황 */}
      <div className="flex flex-row gap-10">
        <div className="w-[585px] h-[210px] border border-[#5bca11] flex flex-col justify-center items-center">
          <div className="relative w-[516px] h-[20px] bg-gray-200 rounded mt-4">
            <div
              className="h-full bg-[#5bca11] rounded"
              style={{
                width: `${
                  totalAvgData?.carbon_emissions &&
                  totalAvgData.carbon_emissions > 0 &&
                  currentData?.carbon_emissions != null
                    ? Math.min(
                        (currentData.carbon_emissions /
                          totalAvgData.carbon_emissions) *
                          100,
                        100
                      )
                    : 0
                }%`
              }}
            />
            <div className="absolute left-0 bottom-6 text-sm text-gray-600">
              0
            </div>
            <div className="absolute right-0 bottom-6 text-sm text-gray-600">
              100
            </div>
            {totalAvgData?.carbon_emissions && (
              <div
                className="absolute flex flex-col justify-center items-center bg-red-200 w-[140px] h-[80px]"
                style={{
                  left: `${
                    totalAvgData?.carbon_emissions > 0 &&
                    currentData?.carbon_emissions != null
                      ? Math.min(
                          (currentData.carbon_emissions /
                            totalAvgData.carbon_emissions) *
                            100,
                          100
                        )
                      : 0
                  }%`,
                  transform: "translateX(-50%)", // 가운데 정렬을 위한 변환
                  bottom: "20px" // 프로그레스 바 위에 위치
                }}
              >
                나의 평균 배출량
                <div>{currentData?.carbon_emissions} kg</div>
              </div>
            )}
          </div>
        </div>

        <div className="w-[585px] h-[210px] border border-[#5bca11] flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-8">
            <div className="bg-red-300 w-[100px] h-[118px]"></div>
            <div>
              <div>
                {((totalAvgData?.carbon_emissions || 0) -
                  (currentData?.carbon_emissions || 0)) /
                  22 >
                0
                  ? (
                      ((totalAvgData?.carbon_emissions || 0) -
                        (currentData?.carbon_emissions || 0)) /
                      22
                    ).toFixed(2) + " 그루의 나무를 심고 있어요"
                  : "0 그루의 나무를 심고 있어요"}
              </div>
              <div>
                {(totalAvgData?.carbon_emissions || 0) -
                  (currentData?.carbon_emissions || 0) >
                0
                  ? `현재까지 평균 배출량보다 ${(
                      (totalAvgData?.carbon_emissions || 0) -
                      (currentData?.carbon_emissions || 0)
                    ).toFixed(2)} kg 덜 배출했어요`
                  : `현재까지 평균 배출량보다 더 배출했어요`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>월간 배출량 추이</div>
        <div>
          <CompareMonthlyEmissions />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default ResultPageMain;
