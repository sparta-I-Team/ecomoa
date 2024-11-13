export interface ChallengeFormInputs {
  content: string;
  images: File[];
  selectedOptions?: {
    // 옵션 필드 추가
    [key: string]: string[];
  };
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

export interface ChallengeOptionParent extends ChallengeOption {
  image: string;
  label2: string;
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

// profileSmall 키 추가했습니다
export interface LevelInfo {
  level: number;
  name: string;
  currentPoints: number;
  maxPoints: number;
  pointsToNextLevel: number;
  image: string;
  bg: string;
  exp: string;
  profile: string;
  profileSmall: string;
}

//이미지

export interface ImageValidation {
  isValid: boolean;
  message?: string;
}
