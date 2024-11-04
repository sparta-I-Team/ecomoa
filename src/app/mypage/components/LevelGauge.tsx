import { LevelInfo } from "@/types/challengesType";

interface LevelGaugeProps {
  pointInfo: LevelInfo;
}
const LevelGauge = ({ pointInfo }: LevelGaugeProps) => {
  if (!pointInfo) return;
  return (
    <section className="space-y-2 w-full flex flex-col justify-center items-center">
      {/* 레벨 */}
      <div className="w-full flex items-center justify-start gap-[10px] px-5">
        <div className="bg-[#D5D7DD] rounded-[32px] flex items-center justify-center w-28 h-8">
          <p>
            LV.{pointInfo?.level} {pointInfo?.name}
          </p>
        </div>

        <p className="">레벨업까지 {pointInfo.pointsToNextLevel}P 남았어요</p>
      </div>
      {/* 게이지 */}
      <div className="w-full flex flex-row gap-3 items-center justify-start px-5 py-3">
        <div className="w-full h-4 bg-gray-200">
          <div
            className="w-full bg-black h-4 transition-all duration-300"
            style={{
              width: `${(pointInfo.currentPoints / pointInfo.maxPoints) * 100}%`
              // width: `${(80 / levelInfo.maxPoints) * 100}%`
            }}
          />
        </div>
        <p className="text-base font-normal text-right">
          {pointInfo.currentPoints}/{pointInfo.maxPoints}
        </p>
      </div>
    </section>
  );
};

export default LevelGauge;
