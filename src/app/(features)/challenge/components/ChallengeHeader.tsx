import { useChallengeDashboard } from "@/hooks/useChallengeDashboard";
import React, { useEffect, useState } from "react";
import { StatsSection } from "./header/StatsSection";
import { LevelSection } from "./header/LevelSection";
import { getUser } from "@/api/auth-actions";

const ChallengeHeader = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getUser();
      setUserId(res?.id || "");
    };
    handleGetUser();
  }, []);

  const { isLoading, error, todayChallenge, levelInfo, co2Difference } =
    useChallengeDashboard(userId);

  if (isLoading) return <>로딩중...</>;

  if (error) return <>{error.message}</>;

  return (
    <header className="flex flex-row justify-between">
      <StatsSection
        todayChallenge={todayChallenge}
        co2Difference={co2Difference}
      />
      <LevelSection levelInfo={levelInfo} />
    </header>
  );
};

export default ChallengeHeader;
