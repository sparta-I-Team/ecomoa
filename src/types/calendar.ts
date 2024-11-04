export interface MonthlyData {
  [key: string]: {
    co2: number;
    point: number;
    challenge_count: number;
  };
}

export interface MonthlyStats {
  totalCo2: number;
  totalPoints: number;
  totalChallenges: number;
}
