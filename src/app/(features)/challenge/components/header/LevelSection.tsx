import { LevelInfo } from "@/types/challengesType";
import Image from "next/image";
import LevelSectionSkeleton from "../ui/LevelSectionSkeleton";

interface LevelSectionProps {
  levelInfo: LevelInfo | null;
  isLoading: boolean;
}

const LevelSection = ({ levelInfo, isLoading }: LevelSectionProps) => {
  if (isLoading || !levelInfo) {
    return <LevelSectionSkeleton />;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col w-[585px] h-[319px] justify-end">
        <figure
          className="relative flex h-[228px] w-full border rounded-3xl"
          style={{ backgroundColor: levelInfo.bg }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Image
              src={levelInfo.image}
              alt={levelInfo.name}
              width={295}
              height={319}
            />
          </div>
        </figure>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-[8px] items-center">
          <p
            className="w-[113px] h-[32px] text-m font-semibold text-[14px] rounded-2xl text-center border-2 p-2"
            style={{ borderColor: levelInfo.exp }}
          >
            LV.{levelInfo.level} {levelInfo.name}
          </p>
          <p className="text-sm text-gray-600">
            레벨업까지 {levelInfo.pointsToNextLevel}P 남았어요
          </p>
        </div>
        <div className="flex w-[585px] flex-row items-center gap-3">
          <div className="w-[476px] bg-gray-200 text-left rounded-full">
            <div
              className="rounded-full h-4 transition-all duration-300 z-index-100"
              style={{
                backgroundColor: levelInfo.exp,
                width: `${
                  (levelInfo.currentPoints / levelInfo.maxPoints) * 100
                }%`
              }}
            />
          </div>
          <p className="text-[14px] text-right">
            {levelInfo.currentPoints}/{levelInfo.maxPoints}P
          </p>
        </div>
      </div>
    </section>
  );
};

export default LevelSection;
