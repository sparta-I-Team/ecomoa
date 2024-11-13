"use client";
import {
  loadMyAllData,
  loadMyAvgData,
  loadRecentFiveMonthsEmissions,
  loadTopUsersData,
  loadTotalUsersData,
  TopData
} from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import React, { useEffect, useState } from "react";
import CompareMonthlyEmissions from "../components/CompareMonthlyEmissions";
import Link from "next/link";
import Image from "next/image";
import { userStore } from "@/zustand/userStore";
import { UserInfo } from "@/types/userInfoType";
import { getUserInfo } from "@/api/user-action";
import Loading from "../components/Loading";
import HistoryCompareCard from "../components/HistoryCompareCard";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const MIN_LOADING_TIME = 3000; // 최소 로딩 시간 (3초)

const ResultPageMain = () => {
  const [totalAvgData, setTotalAvgData] = useState<MonthlyData | null>(null);
  const [myAllData, setMyAllData] = useState<MonthlyData[] | null>(null);
  const [myAllAvgData, setMyAllAvgData] = useState<number>(0);
  const [userTopData, setUserTopData] = useState<TopData | null>(null);
  const [userAllData, setUserAllData] = useState<MonthlyData[] | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = userStore();

  useEffect(() => {
    const fetchStartTime = Date.now();

    const getUserFetch = async () => {
      const res = await getUserInfo(user.id);
      setUserInfo(res);
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          loadTotalUsersData(currentYear, currentMonth, setTotalAvgData),
          loadMyAllData(setMyAllData, null),
          loadMyAvgData(setMyAllAvgData),
          loadTopUsersData(setUserTopData),
          loadRecentFiveMonthsEmissions(currentYear, currentMonth, 2).then(
            (data) => {
              setUserAllData(data);
            }
          ),
          getUserFetch()
        ]).then(() => {
          const timeElapsed = Date.now() - fetchStartTime;
          const remainingTime = MIN_LOADING_TIME - timeElapsed;

          if (remainingTime > 0) {
            // 최소 로딩 시간이 남아있으면 setTimeout으로 추가 대기
            setTimeout(() => setIsLoading(false), remainingTime);
          } else {
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <Loading
        message="탄소 배출량 히스토리 로딩 중"
        subMessage="잠시만 기다려 주세요~!"
      />
    );
  }

  return (
    <>
      <div className="w-[1200px] mx-auto">
        <div className="mt-[76px] mb-[80px]">
          <Link href="/calculator">
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

        {/* 나의 탄소 히스토리 최상단 데이터 */}
        <div className="w-full h-[140px] px-[72px] bg-white rounded-2xl border border-[#dcecdc] justify-between items-center inline-flex mb-[80px]">
          <div className="flex flex-row items-center">
            <Image
              src="/images/lv1.png"
              alt="미리보기"
              width={113}
              height={84}
              className="w-[113px] h-[84px] rounded-[12px]"
            />{" "}
            <div className="ml-[31px]">
              <div className="text-[28px] font-semibold">
                {userInfo?.user_nickname}님
              </div>
            </div>
          </div>
          <Link href="/calculator/result-list">
            <div className="w-[320px] h-[60px] px-6 bg-[#00320f] rounded-[40px] justify-center items-center gap-4 inline-flex text-white">
              <div className="text-[18px]">탄소 배출량 계산 결과표</div>
              <div className="text-[36px] font-semibold">
                {myAllData ? `${myAllData.length}건` : "0건"}
              </div>
            </div>
          </Link>
        </div>

        {/* 배출량 현황 */}
        <p className="text-[24px] font-semibold mb-[32px]">배출량 현황</p>
        <div className="flex flex-row w-full h-[300px] rounded-[16px] justify-between items-center  px-[80px] mb-[24px] border border-[#dcecdc]">
          <div className="flex flex-col">
            <p className="text-black text-[36px] font-bold mb-[36px] ">
              {userInfo?.user_nickname}님의 평균 배출량
            </p>
            <p className="text-[#0fce45] text-[48px] font-semibold mb-[40px]">
              {myAllAvgData.toFixed(2)}kg
            </p>
            <div className="text-[16px]">
              탄소 배출량이 전체 평균 보다{" "}
              {totalAvgData && myAllAvgData ? (
                myAllAvgData > 0 ? (
                  myAllAvgData > totalAvgData.carbon_emissions ? (
                    <>
                      {(
                        100 -
                        (totalAvgData.carbon_emissions / myAllAvgData) * 100
                      ).toFixed(2)}{" "}
                      % 낮아요!
                    </>
                  ) : (
                    <>
                      {(
                        (totalAvgData.carbon_emissions / myAllAvgData) * 100 -
                        100
                      ).toFixed(2)}{" "}
                      % 높아요!
                    </>
                  )
                ) : (
                  <span>현재 평균 배출량이 계산되지 않았습니다.</span>
                )
              ) : null}
            </div>
          </div>

          {/* 프로그레스바 */}
          <div className="flex w-[440px] h-[220px] justify-center bg-[#F5F5F5] rounded-[24px]">
            <div className="relative mt-[115px]">
              {/* 프로그레스 바 */}
              <div className="flex flex-row gap-1">
                <div className="w-[88px] h-[16px] rounded-full bg-[#BFCEFE]" />
                <div className="w-[88px] h-[16px] rounded-full bg-[#9EB6FE]" />
                <div className="w-[88px] h-[16px] rounded-full bg-[#7E9DFD]" />
                <div className="w-[88px] h-[16px] rounded-full bg-[#5E85FD]" />
              </div>

              {/* 최저와 최고 텍스트 */}
              <div className="absolute left-0 top-6 text-[14px] text-gray-700 text-left">
                <div>최저</div>
                <div>0 kg</div>
              </div>
              <div className="absolute right-0 top-6 text-[14px] text-gray-700 text-right">
                <div>최대</div>
                <div>{userTopData?.carbon_emissions.toFixed(2)} kg</div>
              </div>

              {/* progressbarBox */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                style={{
                  left: `${
                    userTopData?.carbon_emissions &&
                    totalAvgData &&
                    myAllAvgData !== null
                      ? Math.min(
                          Math.max(
                            0,
                            (myAllAvgData / userTopData?.carbon_emissions) * 100
                          ),
                          100
                        ).toFixed(2)
                      : 0
                  }%`
                }}
              >
                <Image
                  src="/calculate/BarBox.svg"
                  alt="progressbarBox"
                  width={120}
                  height={51}
                  className="relative top-[-60px]"
                />
                <div className="absolute flex justify-center items-center text-[14px] font-semibold top-[-52px] text-white gap-[10px]">
                  <div className="w-[28px] h-[28px] rounded-full bg- bg-yellow-300"></div>
                  <span>{userInfo?.user_nickname}</span>
                </div>
                <div className="absolute top-[-5px]">
                  <div
                    className={`w-[26px] h-[26px] rounded-full flex items-center justify-center ${
                      myAllAvgData &&
                      userTopData?.carbon_emissions &&
                      myAllAvgData / userTopData?.carbon_emissions < 0.25
                        ? "bg-[#BFCEFE]"
                        : userTopData?.carbon_emissions &&
                          myAllAvgData / userTopData?.carbon_emissions < 0.5
                        ? "bg-[#9EB6FE]"
                        : userTopData?.carbon_emissions &&
                          myAllAvgData / userTopData?.carbon_emissions < 0.75
                        ? "bg-[#7E9DFD]"
                        : "bg-[#5E85FD]"
                    }`}
                  >
                    {" "}
                    <div className="w-[14px] h-[14px] bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full h-[300px] rounded-[16px] justify-between items-center bg-[#00320F] px-[80px] mb-[140px]">
          <div className="flex flex-row justify-center items-center gap-8">
            <div className="flex flex-col">
              <p className="text-white text-[20px] font-bold mb-[24px]">
                지금까지 심은 나무
              </p>
              <div className="text-[#0fce45] text-5xl font-semibold mb-[32px]">
                {myAllAvgData > 0
                  ? (() => {
                      const totalCarbonEmissions =
                        myAllData?.reduce(
                          (total, item) => total + (item.carbon_emissions || 0),
                          0
                        ) || 0;

                      const treeCount =
                        (totalCarbonEmissions -
                          (totalAvgData?.carbon_emissions || 0)) /
                        22;

                      return treeCount > 0
                        ? `${treeCount.toFixed(2)} 그루`
                        : "0 그루";
                    })()
                  : "0 그루"}
              </div>
              <p className="opacity-80 text-white text-[16px] font-normal mb-2">
                평균 사용자보다 적게 배출한 탄소량을 나무의 연간 탄소 흡수량과
                비교해
              </p>
              <p className="opacity-80 text-white text-[16px] font-normal">
                나무로 환산해 보았어요!
              </p>
            </div>
          </div>
          <Image
            src={"/calculate/TreeImg.svg"}
            alt={"tree-image"}
            width={400}
            height={216}
          />
        </div>
        <div className="mb-[80px]">
          <p className="text-[24px] font-semibold mb-[32px]">
            최근 5개월 배출량 추이
          </p>
          <div className="w-full h-[400px] flex justify-center items-center border border-[#DCECDC] rounded-[15px]">
            <CompareMonthlyEmissions />
          </div>
          <div>
            <HistoryCompareCard
              myAllData={myAllData}
              userAllData={userAllData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPageMain;
