import React from "react";
import ResultComponent from "../components/ResultComponent";

const ResultHistory = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요

  return (
    <>
      <div>이전 탄소 배출량 히스토리</div>
      <div className="w-[1200px] border border-[#5bca11] mt-[12px] mb-[20px]"></div>
      <div>
        <div>{currentMonth}월 탄소 배출량 결과표</div>
        <ResultComponent year={currentYear} month={currentMonth} />
      </div>
    </>
  );
};

export default ResultHistory;
