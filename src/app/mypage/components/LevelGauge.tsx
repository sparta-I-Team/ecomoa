import { LevelInfo } from "@/types/challengesType";

interface LevelGaugeProps {
  levelInfo: LevelInfo;
}
const LevelGauge = ({ levelInfo }: LevelGaugeProps) => {
  if (!levelInfo) return;
  return (
    <section className="space-y-2 w-full flex flex-col justify-center items-center">
      {/* 레벨 */}
      <div className="w-full flex items-center justify-start gap-[10px] px-5">
        <div className="border-[1px] border-[#00320F] h-[32px] bg-[#FFF] rounded-[16px] flex items-center justify-center p-[15px_16px]">
          <p className="font-wanted text-[14px] font-[500] leading-[-0.14px] text-[#00320F]">
            LV.{levelInfo?.level} {levelInfo?.name}
          </p>
        </div>

        <p className="font-wanted text-[#00691E] text-[14px] font-[500] leading-[-0.14px]">
          레벨업까지 {levelInfo.pointsToNextLevel}P 남았어요
        </p>
      </div>
      {/* 게이지 */}
      <div className="w-full flex flex-row gap-3 items-center justify-start px-5 py-3">
        <div className="rounded-[12px] w-[400px] h-[16px] bg-transparent border border-[##A1A7B4]">
          <div
            className="rounded-[12px] w-full h-4 transition-all duration-300"
            style={{
              width: `${
                (levelInfo.currentPoints / levelInfo.maxPoints) * 100
              }%`,
              backgroundColor: `${levelInfo.exp}`
            }}
          />
        </div>
        <p className="text-base font-normal text-right">
          <span className="font-[600]">{levelInfo.currentPoints}</span>/
          <span className="text-[#525660]">{levelInfo.maxPoints}P</span>
        </p>
      </div>
    </section>
  );
};

export default LevelGauge;
