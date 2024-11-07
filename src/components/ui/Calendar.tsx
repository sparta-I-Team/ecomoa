import { useState, useEffect } from "react";
import useCalendar from "@/hooks/useCalendar";
import { calendarApi } from "@/api/calendarApi";
import { DAY_OF_THE_WEEK } from "@/utlis/challenge/challenges";
import dayjs from "dayjs";
import { MonthlyData, MonthlyStats } from "@/types/calendar";
import { userStore } from "@/zustand/userStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// dayjs 플러그인 설정
dayjs.extend(utc);
dayjs.extend(timezone);

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthlyData = async () => {
    if (!user?.id) {
      setError("사용자 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 한국 시간 기준으로 월의 시작과 끝을 계산
      const startOfMonth = currentMonth
        .startOf("month")
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const endOfMonth = currentMonth
        .endOf("month")
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const challengeData = await calendarApi.getByDateRange(
        startOfMonth,
        endOfMonth,
        user.id
      );

      const dataByDate: MonthlyData = {};
      challengeData.forEach((item) => {
        // UTC를 KST로 변환
        const date = dayjs(item.created_at)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD");

        if (!dataByDate[date]) {
          dataByDate[date] = {
            co2: 0,
            point: 0,
            challenge_count: 0
          };
        }

        dataByDate[date].co2 += Number(item.co2) || 0;
        dataByDate[date].point += Number(item.point) || 0;
        dataByDate[date].challenge_count += 1;
      });

      const stats = {
        totalCo2: challengeData.reduce(
          (sum, item) => sum + (Number(item.co2) || 0),
          0
        ),
        totalPoints: challengeData.reduce(
          (sum, item) => sum + (Number(item.point) || 0),
          0
        ),
        totalChallenges: challengeData.length
      };

      setMonthlyData(dataByDate);
      setMonthlyStats(stats);
    } catch (error) {
      console.error("Calendar data fetch error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "데이터 로딩 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, currentMonth]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-[100px]">
      <div className="flex flex-col gap-[30px]">
        <p className="text-[20px] text-[#00691E]">
          연속 챌린지 참가에 도전해보세요!
        </p>
        <h1 className="font-bold text-[32px]">
          이번달 나의 탄소 절감 발자취를 확인해 보세요
        </h1>
      </div>

      <div className="flex gap-4 mt-[76px] mb-8 items-center">
        <button
          onClick={() => handleMonthChange(-1)}
          className="w-10 h-10 flex items-center justify-center border-none transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <span className="text-3xl font-medium">
          {currentMonth.format("YYYY년 MM월")}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="w-10 h-10 flex items-center justify-center border-none transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[90px] space-x-6">
          Loading...
        </div>
      ) : (
        <div className="flex flex-row w-full h-[90px] space-x-6 text-white">
          <div className="flex flex-row justify-around items-center w-1/3 bg-[#00320F] border-2 border-gray-300 rounded-xl">
            <p className="font-medium text-[20px]">탄소 절감량</p>
            <p className="font-semibold text-[26px]">
              {monthlyStats.totalCo2.toFixed(2)}kg
            </p>
          </div>
          <div className="flex flex-row justify-around items-center w-1/3 bg-[#00320F] border-2 border-gray-300 rounded-xl">
            <p className="font-medium text-[20px]">포인트 수집</p>
            <p className="font-semibold text-[26px]">
              {monthlyStats.totalPoints}P
            </p>
          </div>
          <div className="flex flex-row justify-around items-center w-1/3 bg-[#00320F] border-2 border-gray-300 rounded-xl">
            <p className="font-medium text-[20px]">챌린지 참여</p>
            <p className="font-semibold text-[26px]">
              {monthlyStats.totalChallenges}건
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center mt-[18px]">
        <div className="grid grid-cols-7 content-center h-[85px] px-[194px]">
          {DAY_OF_THE_WEEK.map((day) => (
            <div
              key={day}
              className={`
                text-center 
                font-semibold
                text-[20px]
                ${
                  day === "토" || day === "일"
                    ? "text-red-500"
                    : "text-gray-600"
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center h-[832px] rounded-3xl">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 content-around px-[194px] h-[160px]"
            >
              {week.map(({ day, isInCurrentMonth }) => {
                const dateStr = day.format("YYYY-MM-DD");
                const dayData = monthlyData[dateStr];
                const isToday =
                  day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

                return (
                  <div
                    key={day.toString()}
                    className={`
                      flex flex-col items-center rounded-2xl h-[110px] gap-[12px]
                      ${!isInCurrentMonth ? "text-gray-400" : ""}
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center
                        w-[60px] h-[60px]
                        font-medium
                        text-[22px]
                        ${
                          isToday
                            ? "bg-[#0D9C36] text-white"
                            : dayData
                            ? "bg-[#DCF7DC]"
                            : isInCurrentMonth
                            ? "bg-white rounded-full"
                            : ""
                        }
                        ${(isToday || dayData) && "rounded-full"}
                      `}
                    >
                      {day.format("D")}
                    </div>
                    {dayData && (
                      <div className="flex flex-col">
                        <p className="text-[12px] font-medium">
                          -{dayData.co2.toFixed(2)}kg
                        </p>
                        <p className="text-[12px] font-medium text-[#0D9C36]">
                          +{dayData.point}P
                        </p>
                      </div>
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
