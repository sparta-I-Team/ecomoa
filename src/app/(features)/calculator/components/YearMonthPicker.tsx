import React, { useState } from "react";

// 달력 선택 type 정리
export interface YearSelectProps {
  thisYear: number | null;
  thisMonth: number | null;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  onCloseDropdown: () => void; // 드롭다운 닫힘 시 호출될 함수 추가
  disabled: boolean;
}

const YearMonthPicker: React.FC<YearSelectProps> = ({
  thisYear,
  thisMonth,
  onChangeYear,
  onChangeMonth,
  onCloseDropdown,
  disabled = false
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(thisYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(thisMonth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const handleYearClick = (year: number) => {
    if (!disabled) {
      setSelectedYear(year);
      onChangeYear(year); // 연도 변경 핸들러 호출
      onCloseDropdown(); // 드롭다운 닫힘 시 호출
    }
  };

  const handleMonthClick = (month: number) => {
    if (!disabled) {
      setSelectedMonth(month);
      onChangeMonth(month); // 월 변경 핸들러 호출
      onCloseDropdown(); // 드롭다운 닫힘 시 호출
    }
    if (selectedYear) {
      setIsDropdownOpen(false); // 연도와 월이 모두 선택되었을 때 닫힘
    }
  };

  const currentYear = new Date().getFullYear(); // 현재 연도 가져오기

  return (
    <div>
      {/* 드롭다운 버튼 */}
      <button onClick={toggleDropdown}>
        {selectedYear && selectedMonth
          ? `${selectedYear}년 ${String(selectedMonth).padStart(2, "0")}월`
          : `${selectedYear}년 ${String(selectedMonth).padStart(2, "0")}월`}
      </button>

      {isDropdownOpen && (
        <div className="flex flex-row gap-4">
          <div className="year-list">
            <p>연도 선택</p>
            {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => (
              <div
                key={2020 + i}
                onClick={() => handleYearClick(2020 + i)}
                className={`dropdown-item ${
                  selectedYear === 2020 + i ? "selected" : ""
                } whitespace-nowrap`}
              >
                {2020 + i}년
              </div>
            ))}
          </div>

          <div className="month-list">
            <p>월 선택</p>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => handleMonthClick(i + 1)}
                className={`dropdown-item ${
                  selectedMonth === i + 1 ? "selected" : ""
                } whitespace-nowrap`}
              >
                {String(i + 1).padStart(2, "0")}월
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default YearMonthPicker;
