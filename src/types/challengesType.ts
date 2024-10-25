export interface ChallengeFormInputs {
  content: string;
  image: FileList;
}

export interface ChallengeStoreType {
  step: 1 | 2;
  selectedChallenges: string[];
  setStep: (step: 1 | 2) => void;
  setSelectedChallenges: (challenges: string[]) => void;
}
