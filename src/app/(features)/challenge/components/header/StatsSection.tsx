import { ChallengeData } from "@/types/challengesType";
import StatsSectionSkeleton from "../ui/StatsSectionSkeleton";

interface StatsSectionProps {
  todayChallenge: ChallengeData | undefined;
  co2Difference: number;
  isLoading: boolean;
}

const StatsSection = ({
  todayChallenge,
  co2Difference,
  isLoading
}: StatsSectionProps) => {
  if (isLoading) {
    return <StatsSectionSkeleton />;
  }

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <div className="w-[524px] h-[175px]">
      <section className="w-[466px] flex flex-col h-full justify-between">
        <article className="flex flex-col">
          <div className="mb-[36px]">
            <p className="text-[16px] text-[#00691E]">
              Today. {month}월 {date}일
            </p>
          </div>

          {todayChallenge ? (
            <div className="flex flex-col gap-[45px]">
              <p className="text-[35px] font-bold">
                탄소 배출량을 {todayChallenge.co2.toFixed(2)}kg 줄이고
              </p>
              <p className="text-[35px] font-bold">
                포인트 {todayChallenge.point}P를 모았어요
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-[40px] text-[40px] font-bold">
              <p>오늘의 데일리 챌린지에</p>
              <p>참여해보세요!</p>
            </div>
          )}
        </article>
        {todayChallenge && (
          <p className="text-[16px] text-gray-600 mb-0">
            {co2Difference > 0
              ? `평균 하루 탄소 절감량보다 ${co2Difference.toFixed(
                  2
                )}kg 더 절감했어요!`
              : co2Difference < 0
              ? `평균 하루 탄소 절감량보다 ${Math.abs(co2Difference).toFixed(
                  2
                )}kg 덜 절감했어요 `
              : `평균 하루 탄소 절감량과 같습니다!`}
          </p>
        )}
      </section>
    </div>
  );
};

export default StatsSection;
