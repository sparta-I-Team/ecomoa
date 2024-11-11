import {
  loadMyRecentFiveMonthsEmissions,
  loadRecentFiveMonthsEmissions
} from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import React, { useEffect, useState } from "react";
import MonthlyChartMain from "./MonthlyChartMain";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const CompareMonthlyEmissions = () => {
  const [emissionsData, setEmissionsData] = useState<MonthlyData[] | null>(
    null
  );
  const [currentData, setCurrentData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadRecentFiveMonthsEmissions(
        currentYear,
        currentMonth,
        5
      );
      setEmissionsData(data);
    };

    const fetchMyData = async () => {
      const data = await loadMyRecentFiveMonthsEmissions(
        currentYear,
        currentMonth,
        5
      );
      setCurrentData(data);
    };
    fetchData();
    fetchMyData();
  }, []);

  return (
    <>
      <div className="flex w-[1100px] h-[300px] ">
        <MonthlyChartMain
          emissionsData={emissionsData}
          currentData={currentData}
        />
      </div>
    </>
  );
};

export default CompareMonthlyEmissions;
