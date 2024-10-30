import React, { useState } from "react";

// 달력 선택 type 정리
export interface YearSelectProps {
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  disabled: boolean;
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const YearMonthPicker: React.FC<YearSelectProps> = ({
  onChangeYear,
  onChangeMonth,
  disabled = false
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    currentMonth
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const handleYearClick = (year: number) => {
    if (!disabled) {
      setSelectedYear(year);
      onChangeYear(year);
    }
  };

  const handleMonthClick = (month: number) => {
    if (!disabled) {
      setSelectedMonth(month);
      onChangeMonth(month);
      if (selectedYear) {
        setIsDropdownOpen(false); // 연도와 월이 모두 선택되었을 때 닫힘
      }
    }
  };

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
          {/* 연도 선택 리스트 */}
          <div className="year-list">
            <p>연도 선택</p>
            {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => (
              <div
                key={2020 + i}
                onClick={() => handleYearClick(2020 + i)}
                className={`dropdown-item ${
                  selectedYear === 2020 + i ? "selected" : ""
                }`}
              >
                {2020 + i}년
              </div>
            ))}
          </div>

          {/* 월 선택 리스트 */}
          <div className="month-list">
            <p>월 선택</p>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => handleMonthClick(i + 1)}
                className={`dropdown-item ${
                  selectedMonth === i + 1 ? "selected" : ""
                }`}
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
