import { useState, useEffect } from "react";
import useCalendar from "@/hooks/useCalendar";
import { calendarApi } from "@/api/calendarApi";
import { DAY_OF_THE_WEEK } from "@/utlis/challenge/challenges";
import dayjs from "dayjs";
import { MonthlyData, MonthlyStats } from "@/types/calendar";
import { userStore } from "@/zustand/userStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const { currentMonth, getDatesInMonth, handleMonthChange } = useCalendar();
  const { user } = userStore();

  const { weeks } = getDatesInMonth(0);

  const [monthlyData, setMonthlyData] = useState<MonthlyData>({});
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalCo2: 0,
    totalPoints: 0,
    totalChallenges: 0
  });

  console.log(currentMonth);
  // 현재 월의 데이터 가져오기
  const fetchMonthlyData = async () => {
    if (!user.id) return;

    try {
      const startOfMonth = currentMonth.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = currentMonth.endOf("month").format("YYYY-MM-DD");

      // 월간 챌린지 데이터 조회
      const challengeData = await calendarApi.getByDateRange(
        startOfMonth,
        endOfMonth,
        user.id
      );

      // 데이터를 날짜별로 정리
      const dataByDate: MonthlyData = {};
      challengeData.forEach((item) => {
        const date = item.created_at.split("T")[0];
        dataByDate[date] = {
          co2: item.co2 || 0,
          point: item.point || 0,
          challenge_count: 1
        };
      });

      // 월간 통계
      const stats = {
        totalCo2: challengeData.reduce((sum, item) => sum + (item.co2 || 0), 0),
        totalPoints: challengeData.reduce(
          (sum, item) => sum + (item.point || 0),
          0
        ),
        totalChallenges: challengeData.length
      };

      setMonthlyData(dataByDate);
      setMonthlyStats(stats);
    } catch (error) {
      console.error("캘린더 데이터 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
  }, [user, currentMonth]);

  return (
    <div>
      {/* 헤더 */}
      <div className="flex gap-4 mt-[100px] mb-8 items-center">
        <button
          onClick={() => handleMonthChange(-1)}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <span className="text-3xl font-medium">
          {currentMonth.format("YYYY년 MM월")}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* 월별 통계 */}
      <div className="flex flex-row w-full h-[70px] space-x-6">
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>탄소 절감량 {monthlyStats.totalCo2.toFixed(2)}kg</p>
        </div>
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>포인트 수집 {monthlyStats.totalPoints}P</p>
        </div>
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>챌린지 참여 {monthlyStats.totalChallenges}건</p>
        </div>
      </div>

      {/* 캘린더 그리드 */}
      <div className="flex flex-col justify-center py-[30px]">
        <div className="grid grid-cols-7 mb-4">
          {DAY_OF_THE_WEEK.map((day) => (
            <div key={day} className="text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 bg-gray-200 border-2 border-gray-300"
            >
              {week.map(({ day, isInCurrentMonth }) => {
                const dateStr = day.format("YYYY-MM-DD");
                const dayData = monthlyData[dateStr];
                const today = new Date();
                const isToday =
                  day.format("YYYY-MM-DD") ===
                  dayjs(today).format("YYYY-MM-DD");

                return (
                  <div
                    key={day.toString()}
                    className={`
                      flex flex-col items-center p-4
                      ${!isInCurrentMonth ? "text-gray-400" : ""}
                      hover:bg-gray-300 transition-colors
                      h-[110px]
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center
                        w-10 h-10
                        font-medium
                        ${isToday ? "bg-red-500" : dayData ? "bg-gray-400" : ""}
                        ${(isToday || dayData) && "rounded-full text-white"}
                      `}
                    >
                      {day.format("D")}
                    </div>
                    {dayData && (
                      <>
                        <p className="text-sm font-medium">
                          {dayData.co2.toFixed(2)}kg
                        </p>
                        <p className="text-sm font-medium">+{dayData.point}P</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
