import { useChallengeList, useUserChallengeList } from "@/hooks/useChallenge";
import { calculateLevelInfo } from "@/utlis/challenge/levelCalculator";
import { useEffect, useState } from "react";
import { LevelInfo } from "@/types/challengesType";

export const useChallengeDashboard = (userId: string) => {
  // 기존 데이터 페칭
  const {
    data: challengesData,
    isLoading: isUserChallengeLoading,
    error
  } = useUserChallengeList(userId);

  const { data: challengesList, isLoading: isChallengeListLoading } =
    useChallengeList();

  const [co2Difference, setCo2Difference] = useState(0);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);

  // 전체 로딩 상태 계산
  const isLoading = isUserChallengeLoading || isChallengeListLoading || !userId;

  // 오늘의 챌린지 계산
  const today = new Date().toISOString().split("T")[0];
  const todayChallenge = challengesData
    ?.filter((challenge) => challenge.created_at.split("T")[0] === today)
    ?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

  // 레벨 정보 계산 - useEffect로 이동
  useEffect(() => {
    if (!challengesData || isLoading) {
      setLevelInfo(null);
      return;
    }

    const totalPoints = challengesData.reduce(
      (sum, challenge) => sum + challenge.point,
      0
    );
    const calculatedLevelInfo = calculateLevelInfo(totalPoints);
    setLevelInfo(calculatedLevelInfo);
  }, [challengesData, isLoading]);

  // CO2 차이 계산
  useEffect(() => {
    if (!challengesList || challengesList.length === 0) {
      setCo2Difference(0);
      return;
    }

    const totalCo2 = challengesList.reduce(
      (sum, challenge) => sum + challenge.co2,
      0
    );
    const averageCo2 = totalCo2 / challengesList.length;
    const difference = (todayChallenge?.co2 || 0) - averageCo2;
    setCo2Difference(difference);
  }, [challengesList, todayChallenge]);

  return {
    isLoading,
    error,
    todayChallenge,
    levelInfo,
    co2Difference
  };
};
