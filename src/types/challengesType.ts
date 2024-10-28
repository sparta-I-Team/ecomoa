export interface ChallengeFormInputs {
  content: string;
  images: FileList;
  options: Record<string, string[]>;
}

export interface ChallengeStoreType {
  step: 1 | 2;
  selectedChallenges: string[];
  setStep: (step: 1 | 2) => void;
  setSelectedChallenges: (challenges: string[]) => void;
}

export interface ChallengeOption {
  id: string;
  label: string;
}

//API

export interface InsertChallengeParams {
  userId: string;
  content: string;
  images: File[];
  selectedOptions: Record<string, string[]>;
  carbon: string;
  point: number;
}
