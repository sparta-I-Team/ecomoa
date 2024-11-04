import {
  loadMyRecentFiveMonthsEmissions,
  loadRecentFiveMonthsEmissions
  // loadUserAndFetchData
} from "@/hooks/monthlyData";
import { MonthlyData } from "@/types/calculate";
import React, { useEffect, useState } from "react";
import MonthlyChartMain from "./MonthlyChartMain";

// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;

const CompareMonthlyEmissions = () => {
  const [emissionsData, setEmissionsData] = useState<MonthlyData[] | null>(
    null
  );
  // const [user, setUser] = useState<string | null>(null);
  // const [thisYear, setThisYear] = useState<number | null>(currentYear);
  // const [thisMonth, setThisMonth] = useState<number | null>(currentMonth);
  const [currentData, setCurrentData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadRecentFiveMonthsEmissions(2024, 11, 5);
      setEmissionsData(data);
      console.log(data);
    };

    const fetchMyData = async () => {
      const data = await loadMyRecentFiveMonthsEmissions(2024, 11, 5);
      setCurrentData(data);
      console.log(data);
    };
    fetchData();
    fetchMyData();
  }, []);

  return (
    <>
      <div>
        <MonthlyChartMain
          emissionsData={emissionsData}
          currentData={currentData}
        />
      </div>
    </>
  );
};

export default CompareMonthlyEmissions;
