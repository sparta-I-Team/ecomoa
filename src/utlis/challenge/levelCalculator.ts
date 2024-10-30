import { LevelInfo } from "@/types/challengesType";
import { LEVEL_CONFIG } from "./challenges";

export const calculateLevelInfo = (totalPoints: number): LevelInfo => {
  for (const [level, config] of Object.entries(LEVEL_CONFIG)) {
    if (totalPoints >= config.min && totalPoints <= config.max) {
      const currentPoints = totalPoints - config.min;
      const levelRange = config.max - config.min;
      const pointsToNextLevel = config.max - totalPoints;

      return {
        level: Number(level),
        name: config.name,
        currentPoints,
        maxPoints: levelRange,
        pointsToNextLevel,
        image: config.image
      };
    }
  }

  return {
    level: 4,
    name: LEVEL_CONFIG[4].name,
    currentPoints: 20000,
    maxPoints: 20000,
    pointsToNextLevel: 0,
    image: LEVEL_CONFIG[4].image
  };
};
