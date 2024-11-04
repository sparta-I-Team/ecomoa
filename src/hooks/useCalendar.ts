import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface DateInfo {
  isInCurrentMonth: boolean;
  day: Dayjs;
}

interface CalendarData {
  weeks: DateInfo[][];
  dates: DateInfo[];
}

const useCalendar = () => {
  // 현재 보여지는 월 상태 관리
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // 달력에 표시할 날짜들 계산
  const getDatesInMonth = (monthOffset: number): CalendarData => {
    const targetMonth = currentMonth.add(monthOffset, "month");

    // 달력의 시작일 (해당 월의 첫 주 -> 일요일)
    const startOfCalendar = targetMonth.startOf("month").startOf("week");

    // 달력의 마지막일 (해당 월 마지막 주 -> 토요일)
    const endOfCalendar = targetMonth.endOf("month").endOf("week");

    const dates: DateInfo[] = [];

    let day = startOfCalendar;
    while (day.isBefore(endOfCalendar) || dates.length % 7 !== 0) {
      // 현재 월에 속하는 날짜인지 체크
      const isInCurrentMonth = day.month() === targetMonth.month();
      dates.push({
        isInCurrentMonth,
        day
      });
      day = day.add(1, "day");
    }

    // 주 단위로 그룹화
    const weeks = dates.reduce((weeks: DateInfo[][], date, index) => {
      if (index % 7 === 0) weeks.push([]);
      weeks[Math.floor(index / 7)].push(date);
      return weeks;
    }, []);

    return {
      weeks,
      dates
    };
  };

  // 월 변경
  const handleMonthChange = (offset: number) => {
    setCurrentMonth(currentMonth.add(offset, "month"));
  };

  // 년 변경
  const handleYearChange = (offset: number) => {
    setCurrentMonth(currentMonth.add(offset, "year"));
  };

  return {
    currentMonth,
    getDatesInMonth,
    handleMonthChange,
    handleYearChange
  };
};

export default useCalendar;
