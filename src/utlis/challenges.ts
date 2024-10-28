import { ChallengeOption } from "@/types/challengesType";

export const CHALLENGES: ChallengeOption[] = [
  { id: "transport", label: "대중교통 이용" },
  { id: "bike", label: "자전거 이용" },
  { id: "disposable", label: "일회 용품 사용하지 않기" },
  { id: "electricity", label: "전기 절약하기" },
  { id: "files", label: "디지털 파일 정리" },
  { id: "used", label: "친환경 제품 구매" }
];

export const CHALLENGE_OPTIONS: Record<string, ChallengeOption[]> = {
  transport: [
    { id: "bus", label: "버스" },
    { id: "subway", label: "지하철" },
    { id: "train", label: "기차" }
  ],
  bike: [
    { id: "public-bike", label: "공공자전거" },
    { id: "personal-bike", label: "개인자전거" }
  ],
  disposable: [
    { id: "tumbler", label: "텀블러 사용" },
    { id: "eco-bag", label: "장바구니 사용" },
    { id: "reusable-container", label: "다회용기 사용" }
  ],
  electricity: [
    { id: "standby-power", label: "대기전력 차단" },
    { id: "unused-plug", label: "미사용 플러그 뽑기" }
  ],
  files: [
    { id: "delete-files", label: "불필요한 파일 삭제" },
    { id: "organize-folders", label: "폴더 정리" },
    { id: "cloud-cleanup", label: "클라우드 정리" }
  ],
  used: [
    { id: "eco-friendly", label: "친환경 인증 제품" },
    { id: "second-hand", label: "중고 제품" },
    { id: "local-product", label: "지역 생산 제품" }
  ]
};
