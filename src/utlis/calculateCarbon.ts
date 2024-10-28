// utils/calculateCarbon.ts
export const CARBON_VALUES = {
  transport: 1.3,
  bike: 1.0,
  disposable: 0.15,
  electricity: 0.3,
  files: 0.03,
  used: 0.3
} as const;

export const calculateTotalCarbon = (selectedChallenges: string[]): string => {
  const totalCarbon = selectedChallenges.reduce((sum, challengeId) => {
    return (
      sum + (CARBON_VALUES[challengeId as keyof typeof CARBON_VALUES] || 0)
    );
  }, 0);

  return totalCarbon.toFixed(2);
};
