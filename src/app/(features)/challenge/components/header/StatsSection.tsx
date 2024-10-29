interface StatsSectionProps {
  todayChallenge: any;
  co2Difference: number;
}

export const StatsSection = ({
  todayChallenge,
  co2Difference
}: StatsSectionProps) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <section className="flex flex-col items-center justify-center">
      <article className="space-y-4">
        <p className="text-sm text-gray-600">
          Today. {month}월 {date}일
        </p>

        {todayChallenge ? (
          <>
            <div className="space-y-2">
              <p className="text-3xl font-bold">
                탄소 배출량을 {todayChallenge.co2.toFixed(2)}kg 줄이고
              </p>
              <p className="text-3xl font-bold">
                포인트 {todayChallenge.point}P를 모았어요
              </p>
            </div>

            <p className="text-sm text-gray-600">
              {co2Difference > 0
                ? `평균 하루 탄소 절감량보다 ${co2Difference.toFixed(
                    2
                  )}kg 더 절감했어요 ㅎㅎ`
                : co2Difference < 0
                ? `평균 하루 탄소 절감량보다 ${Math.abs(co2Difference).toFixed(
                    2
                  )}kg 덜 절감했어요 ㅜㅜ`
                : `평균 하루 탄소 절감량과 같습니다!`}
            </p>
          </>
        ) : (
          <p className="text-xl">오늘의 데일리 챌린지에 참여해보세요!</p>
        )}
      </article>
    </section>
  );
};
