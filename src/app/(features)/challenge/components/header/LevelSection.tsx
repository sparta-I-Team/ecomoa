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
    <section className="flex flex-col gap-2">
      <figure
        className={`relative flex justify-center w-[600px] h-[270px] border rounded-3xl`}
        style={{ backgroundColor: levelInfo.bg }}
      >
        <Image
          src={levelInfo.image}
          alt={levelInfo.name}
          fill
          className="object-contain"
        />
      </figure>
      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <p
            className="w-[75px] text-m font-semibold bg-gray-200 rounded-xl py-1 text-center"
            style={{ backgroundColor: levelInfo.bg }}
          >
            LV.{levelInfo.level} {levelInfo.name}
          </p>
          <p className="text-sm text-gray-600">
            레벨업까지 {levelInfo.pointsToNextLevel}P 남았어요
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className=" rounded-full h-4 transition-all duration-300"
            style={{
              backgroundColor: levelInfo.bg,
              width: `${(levelInfo.currentPoints / levelInfo.maxPoints) * 100}%`
            }}
          />
        </div>
        <p className="text-sm text-right">
          {levelInfo.currentPoints}/{levelInfo.maxPoints}
        </p>
      </div>
    </section>
  );
};

export default LevelSection;
