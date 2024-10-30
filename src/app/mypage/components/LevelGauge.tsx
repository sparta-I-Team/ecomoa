import { LevelInfo } from "@/types/challengesType";

interface LevelGaugeProps {
  levelInfo: LevelInfo;
}
const LevelGauge = ({ levelInfo }: LevelGaugeProps) => {
  console.log(levelInfo);
  return (
    <div className="space-y-2 w-full flex flex-col justify-center items-center">
      {/* 레벨 */}
      <div className="w-full flex items-center justify-start gap-[10px] px-5">
        <div className="bg-[#D5D7DD] rounded-[32px] flex items-center justify-center w-28 h-8">
          <p>
            LV.{levelInfo.level} {levelInfo.name}
          </p>
        </div>

        <p className="">레벨업까지 {levelInfo.pointsToNextLevel}P 남았어요</p>
      </div>
      {/* 게이지 */}
      <div className="w-[406px] flex flex-row gap-3 items-center justify-start px-5 py-3">
        <div className="w-full h-4 bg-gray-200">
          <div
            className="w-full bg-black h-4 transition-all duration-300"
            style={{
              // width: `${(levelInfo.currentPoints / levelInfo.maxPoints) * 100}%`
              width: `${(80 / levelInfo.maxPoints) * 100}%`
            }}
          />
        </div>
        <p className="text-base font-normal text-right">
          {/* {levelInfo.currentPoints}/{levelInfo.maxPoints} */}
          {80}/{1000}
        </p>
      </div>
    </div>
  );
};

export default LevelGauge;
