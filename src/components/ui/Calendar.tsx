import useCalendar from "@/hooks/useCalendar";

const Calendar = () => {
  const { currentMonth, getDatesInMonth, handleMonthChange } = useCalendar();
  const { weeks } = getDatesInMonth(0);

  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      {/* 헤더 */}
      <div className="flex gap-3 mt-[100px] mb-8">
        <button
          onClick={() => handleMonthChange(-1)}
          className="w-6 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          {`<`}
        </button>
        <span className="text-xl font-medium">
          {currentMonth.format("YYYY년 MM월")}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="w-6 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          {`>`}
        </button>
      </div>

      <div className="flex flex-row w-full h-[70px] space-x-6">
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>탄소 절감량 52.42kg</p>
        </div>
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>포인트 수집 3000P</p>
        </div>
        <div className="flex flex-row justify-center items-center w-1/3 bg-gray-200 border-2 border-gray-300">
          <p>챌린지 참여 34건</p>
        </div>
      </div>
      <div className="flex flex-col justify-center py-[30px]">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-4">
          {dayOfTheWeek.map((day) => (
            <div key={day} className="text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* 달력 그리드 */}
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 bg-gray-200 border-2 border-gray-300"
            >
              {week.map(({ day, isInCurrentMonth }) => (
                <div
                  key={day.toString()}
                  className={`
                  flex flex-col items-center p-4
                  ${!isInCurrentMonth ? "text-gray-300" : ""}
                  hover:bg-gray-300 transition-colors
                `}
                >
                  <div
                    className="
                  flex items-center justify-center
                  w-10 h-10
                  bg-gray-400 rounded-full
                  text-white
                  font-medium
                 "
                  >
                    {day.format("D")}
                  </div>
                  <p className="text-sm font-medium">-3.08kg</p>
                  <p className="text-sm font-medium">+300P</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
