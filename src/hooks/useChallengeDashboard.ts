import { useChallengeList, useUserChallengeList } from "@/hooks/useChallenge";
import { calculateLevelInfo } from "@/utlis/challenge/levelCalculator";
import { useEffect, useState } from "react";

export const useChallengeDashboard = (userId: string) => {
  const {
    data: challengesData,
    isLoading,
    error
  } = useUserChallengeList(userId);

  const { data: challengesList } = useChallengeList();

  const [co2Difference, setCo2Difference] = useState(0);

  // 오늘의 챌린지 계산
  const today = new Date().toISOString().split("T")[0];
  const todayChallenge = challengesData
    ?.filter((challenge) => challenge.created_at.split("T")[0] === today)
    ?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

  // 레벨 정보 계산
  const totalPoints =
    challengesData?.reduce((sum, challenge) => sum + challenge.point, 0) || 0;
  const levelInfo = calculateLevelInfo(totalPoints);

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
