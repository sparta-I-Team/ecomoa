"use client";
import { loadMyAllData } from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ResultListPage = () => {
  const [myAllData, setMyAllData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    loadMyAllData(setMyAllData);
  }, []);

  return (
    <>
      <div className="w-[1200px] mx-auto">
        <div className="mt-[76px] mb-[80px]">
          <Link href="/calculator/result-history-main">
            <p className="text-[16px]"> &lt; 탄소 계산기 홈</p>
          </Link>
          <div className="w-full h-[1px] bg-gray-300 my-4 mb-[36px]"></div>
          <p className="text-[#32343a] text-[30px] font-semibold mb-[28px]">
            탄소 배출량 계산 히스토리
          </p>
          <p className=" text-[20px] font-normal text-[#00691E]">
            이번 달 이산화탄소 배출량이 얼마나 발생했을지 확인해봅시다
          </p>
        </div>

        <div className="mb-[28px]">
          <div className="flex w-full h-[92px] bg-[#00320f] rounded-xl">
            <div className="flex flex-row justify-start items-center pl-6 text-[20px] text-white gap-2">
              탄소 계산 히스토리
              <div>{myAllData ? `${myAllData.length}건` : "0건"}</div>
            </div>
          </div>
        </div>

        {/* 리스트 시작 */}
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
                <>
                  <Link href={`/calculator/result/${data.year}/${data.month}`}>
                    <div
                      key={index}
                      className="flex flex-row w-[1120px] h-[92px] p-[24px]"
                    >
                      <Image
                        src={"/calculate/electricity_color.svg"}
                        alt={"electricity_color"}
                        width={48}
                        height={48}
                      />
                      <div className="flex flex-row justify-center items-center ml-5">
                        <div>
                          {data.year}년 {data.month}월 탄소 계산 결과표
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <div className="w-full h-[1px] bg-gray-300" />
                    </div>
                  </Link>
                </>
              ))
          ) : (
            // mt 속성 추가
            <div className="mt-[50px]">데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultListPage;
