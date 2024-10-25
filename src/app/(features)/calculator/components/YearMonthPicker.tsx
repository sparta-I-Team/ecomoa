import React from "react";

// 달력 선택 type 정리
export interface YearSelectProps {
  onChangeYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const currentYear = new Date().getFullYear();

const YearMonthPicker: React.FC<YearSelectProps> = ({
  onChangeYear,
  onChangeMonth
}) => {
  return (
    <>
      {/* 연도 고르기 */}
      <select onChange={onChangeYear} defaultValue={currentYear}>
        {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => (
          <option key={2020 + i} value={2020 + i}>
            {2020 + i}
          </option>
        ))}
      </select>

      {/* 달 고르기 */}
      <select onChange={onChangeMonth} defaultValue={new Date().getMonth() + 1}>
        <option value="">월</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {String(i + 1).padStart(2, "0")}월
          </option>
        ))}
      </select>
    </>
  );
};

export default YearMonthPicker;
