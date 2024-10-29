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

interface ChallengeOptions {
  bike?: string[];
  disposable?: string[];
  files?: string[];
  transport?: string[];
  [key: string]: string[] | undefined; 
 }

 interface UserInfo {
  user_nickname: string;
 }

 export interface ChallengeData {
  chall_id: string;
  user_id: string;
  content: string;
  co2: number;
  point: number;
  image_urls: string[];
  selected_options: ChallengeOptions;
  created_at: string;
  updated_at: string;
  user_info: UserInfo;
 }

 export interface LevelInfo {
  level: number;
  name: string;
  currentPoints: number;
  maxPoints: number;
  pointsToNextLevel: number;
  image: string;
}