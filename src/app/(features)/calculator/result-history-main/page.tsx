"use client";
import {
  loadMyAllData,
  loadMyAvgData,
  loadRecentFiveMonthsEmissions,
  loadTopUsersData,
  loadUsersAvgData,
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
import { calculateLevelInfo } from "@/utlis/challenge/levelCalculator";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const ResultPageMain = () => {
  const [userAvgData, setUserAvgData] = useState<number>(0);
  const [myAllData, setMyAllData] = useState<MonthlyData[] | null>(null);
  const [myAllAvgData, setMyAllAvgData] = useState<number>(0);
  const [userTopData, setUserTopData] = useState<TopData | null>(null);
  const [userAllData, setUserAllData] = useState<MonthlyData[] | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = userStore();

  // 유저 이미지 가지고 오기
  const levelInfo = calculateLevelInfo(userInfo?.user_point ?? 0);

  useEffect(() => {
    const getUserFetch = async () => {
      const res = await getUserInfo(user.id);
      setUserInfo(res);
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          loadUsersAvgData(setUserAvgData), // 유저 토탈 데이터
          loadMyAllData(setMyAllData, null), // 내 전체 데이터
          loadMyAvgData(setMyAllAvgData), // 내 평균 데이터
          loadTopUsersData(setUserTopData), // 유저 최고 데이터
          loadRecentFiveMonthsEmissions(currentYear, currentMonth, 2).then(
            (data) => {
              setUserAllData(data);
            }
          ),
          getUserFetch()
        ]);

        // 모든 데이터가 성공적으로 패칭되면 로딩 상태를 false로 변경
        setIsLoading(false);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setIsLoading(false); // 오류가 발생한 경우에도 로딩을 종료
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
      <div className="w-full min-w-[360px] max-w-[1200px] mx-auto">
        <div className="px-[20px] md:px-[0px] mb-[58px] md:mb-[80px]">
          {/* 페이지 header */}
          <div className="w-[320px] md:w-full md:px-[0px]">
            <div className="mt-[36px] md:mt-[76px] mb-[48px] md:mb-[60px]">
              <Link href="/calculator/calculate">
                <p className="text-[16px]"> &lt; 탄소계산기 홈</p>
              </Link>
              <div className="w-full h-[1px] bg-gray-300 my-4 mb-[36px]"></div>
            </div>
            <div className="mb-[58px] md:mb-[80px] leading-[1] md:leading-[80%]">
              <p className="text-[#32343a] text-[24px] md:text-[30px] font-semibold mb-[16px] md:mb-[28px]">
                탄소 배출량 계산 히스토리
              </p>
              <p className=" text-[16px] md:text-[20px] font-normal text-[#00691E]">
                이번 달 이산화탄소 배출량이 얼마나 발생했을지 확인해봅시다
              </p>
            </div>
          </div>

          {/* 나의 탄소 히스토리 최상단 데이터 */}
          <div className="min-w-[320px] w-full  bg-white rounded-2xl border border-[#dcecdc] mb-[80px] md:px-[72px]">
            <div className="flex flex-col md:flex-row w-full h-[200px] md:h-[140px] md:justify-between py-[20px] items-center">
              <div className="flex items-center">
                <Image
                  src={levelInfo.profile}
                  alt="미리보기"
                  width={114}
                  height={84}
                  className="w-[114px] h-[84px] rounded-[12px]"
                />
                <div className="ml-[31px]">
                  <div className="text-[20px] md:text-[28px] font-semibold">
                    {userInfo?.user_nickname}님
                  </div>
                </div>
              </div>

              {/* 결과표 버튼 */}
              <div className="mt-[28px] md:mt-0">
                <Link href="/calculator/result-list">
                  <div className="flex w-[280px] h-[50px] md:w-[320px] md:h-[60px] bg-[#00320f] rounded-[40px] justify-center items-center gap-4 text-white ">
                    <div className="text-[18px]">탄소 배출량 계산 결과표</div>
                    <div className="text-[32px] md:text-[36px] font-semibold">
                      {myAllData ? `${myAllData.length}건` : "0건"}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 배출량 현황 */}
          <div>
            <p className="text-[14px] md:text-[24px] font-semibold mb-[20px] md:mb-[32px]">
              배출량 현황
            </p>
            <div className="flex flex-col md:flex-row min-w-[320px] w-full h-[356px] md:h-[300px] rounded-[16px] justify-between items-center py-[40px] px-[32px] md:px-[80px] mb-[24px] border border-[#dcecdc]">
              <div className="flex flex-col">
                <p className="text-black text-[24px] md:text-[36px] font-bold mb-[36px] md:leading-[1]">
                  {userInfo?.user_nickname}님의 평균 배출량
                </p>
                <p className="text-[#0fce45] text-[36px] md:text-[48px] font-semibold mb-[40px]">
                  {myAllAvgData.toFixed(2)}kg
                </p>
                <div className="text-[14px] md:text-[16px]">
                  탄소 배출량이 평균 보다{" "}
                  {userAvgData && myAllAvgData ? (
                    myAllAvgData > 0 ? (
                      Number(userAvgData) < myAllAvgData ? (
                        <>
                          {(
                            (myAllAvgData / Number(userAvgData) - 1) *
                            100
                          ).toFixed(2)}{" "}
                          % 높아요!
                        </>
                      ) : (
                        <>
                          {(
                            (Number(userAvgData) / myAllAvgData - 1) *
                            100
                          ).toFixed(2)}{" "}
                          % 낮아요!
                        </>
                      )
                    ) : (
                      <span>현재 평균 배출량이 계산되지 않았습니다.</span>
                    )
                  ) : null}
                </div>
              </div>

              {/* 프로그레스바 */}
              <div className="flex w-[256px] md:w-[440px] h-[128px] md:h-[220px] justify-center bg-[#F5F5F5] rounded-[14px]">
                <div className="relative mt-[60px] md:mt-[115px]">
                  {/* 프로그레스바 모양 */}
                  <div className="flex flex-row gap-1">
                    <div className="w-[50px] h-[10px] md:w-[88px] md:h-[16px] rounded-full bg-[#BFCEFE]" />
                    <div className="w-[50px] h-[10px] md:w-[88px] md:h-[16px] rounded-full bg-[#9EB6FE]" />
                    <div className="w-[50px] h-[10px] md:w-[88px] md:h-[16px] rounded-full bg-[#7E9DFD]" />
                    <div className="w-[50px] h-[10px] md:w-[88px] md:h-[16px] rounded-full bg-[#5E85FD]" />
                  </div>

                  {/* 최저와 최고 텍스트 */}
                  <div className="absolute left-0 top-[14px] md:top-[24px] text-[8px] md:text-[14px] text-gray-700 text-left">
                    <div>최저</div>
                    <div className="font-semibold">0 kg</div>
                  </div>
                  <div className="absolute right-0 top-[14px] md:top-[24px] text-[8px] md:text-[14px] text-gray-700 text-right">
                    <div>최대</div>
                    <div className="font-semibold">
                      {userTopData?.carbon_emissions.toFixed(2)} kg
                    </div>
                  </div>

                  {/* 프로그레스바 네이밍 */}
                  <div
                    className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                    style={{
                      left: `${
                        userTopData?.carbon_emissions && myAllAvgData !== null // 이 두개의 값이 다 있을 때만 계산 시작
                          ? // 위치 계산 시작
                            Math.min(
                              Math.max(
                                0,
                                (myAllAvgData / userTopData?.carbon_emissions) *
                                  100
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
                      className="relative top-[-40px] md:top-[-60px] w-[70px] md:w-[120px]"
                    />
                    <div className="absolute flex justify-center items-center text-[8px] md:text-[14px] font-semibold top-[-35px] md:top-[-52px] text-white gap-[10px]">
                      <Image
                        src={levelInfo.profileSmall}
                        alt="내 레벨 이미지"
                        width={28}
                        height={28}
                        className="w-[16px] md:w-[28px] rounded-[12px]"
                      />{" "}
                      <span>{userInfo?.user_nickname}</span>
                    </div>
                    <div className="absolute top-[-3px] md:top-[-5px]">
                      <div
                        className={`w-[15px] h-[15px] md:w-[26px] md:h-[26px] rounded-full flex items-center justify-center ${
                          myAllAvgData &&
                          userTopData?.carbon_emissions &&
                          myAllAvgData / userTopData?.carbon_emissions < 0.25
                            ? "bg-[#BFCEFE]"
                            : userTopData?.carbon_emissions &&
                              myAllAvgData / userTopData?.carbon_emissions < 0.5
                            ? "bg-[#9EB6FE]"
                            : userTopData?.carbon_emissions &&
                              myAllAvgData / userTopData?.carbon_emissions <
                                0.75
                            ? "bg-[#7E9DFD]"
                            : "bg-[#5E85FD]"
                        }`}
                      >
                        {" "}
                        <div className="w-[8px] h-[8px] md:w-[14px] md:h-[14px] bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute top-[3px] transform -translate-x-1/2 flex flex-col items-center"
                    style={{
                      left: `${
                        userTopData?.carbon_emissions && userAvgData !== null // 이 두개의 값이 다 있을 때만 계산 시작
                          ? // 위치 계산 시작
                            Math.min(
                              Math.max(
                                0,
                                (Number(userAvgData) /
                                  userTopData?.carbon_emissions) *
                                  100
                              ),
                              100
                            ).toFixed(2)
                          : 0
                      }%`
                    }}
                  >
                    <div className="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-white rounded-full" />
                    <div className="flex flex-col items-center md:gap-1 text-[8px] md:text-[14px] text-gray-700">
                      <div className="mt-[6px] md:mt-[10px]">평균</div>
                      <div className="font-semibold">
                        {userAvgData.toFixed(2)} kg
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 나무 영역 */}
          <div className="flex flex-col md:flex-row px] w-full h-[390px] md:h-[300px] rounded-[16px] justify-between items-center bg-[#00320F] px-[32px] py-[40px] md:px-[80px] mb-[140px]">
            <div className="flex flex-row justify-center items-center gap-8">
              <div className="flex flex-col">
                <p className="text-white text-[16px] md:text-[20px] font-bold mb-[24px]">
                  지금까지 심은 나무
                </p>
                <div className="text-[#FFD64E] text-[36px] font-semibold mb-[28px] md:mb-[32px]">
                  {myAllAvgData > 0
                    ? (() => {
                        const totalCarbonEmissions =
                          myAllData?.reduce(
                            (total, item) =>
                              total + (item.carbon_emissions || 0),
                            0
                          ) || 0;

                        const treeCount =
                          (totalCarbonEmissions - (Number(userAvgData) || 0)) /
                          22;

                        return treeCount > 0
                          ? `${treeCount.toFixed(2)} 그루`
                          : "0 그루";
                      })()
                    : "0 그루"}
                </div>
                <p className="md:w-[450px] text-white text-[16px] mb-2 leading-[1.2]">
                  평균 사용자보다 적게 배출한 탄소량을 나무의 연간 탄소 흡수량과
                  비교해 나무로 환산해 보았어요!
                </p>
              </div>
            </div>
            <Image
              src={"/calculate/treeImg.svg"}
              alt={"tree-image"}
              width={400}
              height={216}
            />
          </div>

          {/* 최근 5개월 배출량 추이 */}
          <div className="mb-[80px]">
            <p className="text-[24px] font-semibold mb-[32px]">
              최근 5개월 배출량 추이
            </p>

            {/* 기준값 */}
            <div className="flex flex-row gap-2 text-[12px] md:text-[14px] justify-end right-0 mt-[20px] relative">
              <div className="flex flex-row absolute top-[20px] right-[20px] gap-4">
                <div className="flex flex-row gap-1 items-center">
                  <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-[#D5D7DD]" />
                  <div>평균 배출량</div>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-[#FF7D6F]" />
                  <div>나의 총 배출량</div>
                </div>
              </div>
            </div>

            {/* 차트 */}
            <div className=" w-full min-w-[320px] md:w-full h-[400px] flex justify-center items-center border border-[#DCECDC] rounded-[15px] overflow-hidden">
              <div className="w-full h-full overflow-x-auto md:flex md:justify-center md:items-center md:overflow-x-hidden">
                <CompareMonthlyEmissions />
              </div>
            </div>
            <div>
              <HistoryCompareCard
                myAllData={myAllData}
                userAllData={userAllData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPageMain;
