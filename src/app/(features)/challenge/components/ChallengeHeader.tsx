import { useChallengeDashboard } from "@/hooks/useChallengeDashboard";
import React, { useEffect, useState } from "react";
import LevelSection from "./header/LevelSection";
import StatsSection from "./header/StatsSection";
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

  if (error) return <>{error.message}</>;

  return (
    <header className="flex flex-row justify-between">
      <StatsSection
        todayChallenge={todayChallenge}
        co2Difference={co2Difference}
        isLoading={isLoading}
      />
      <LevelSection levelInfo={levelInfo} isLoading={isLoading} />
    </header>
  );
};

export default ChallengeHeader;
