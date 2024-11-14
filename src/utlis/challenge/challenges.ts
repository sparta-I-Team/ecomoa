import { ChallengeOption, ChallengeOptionParent } from "@/types/challengesType";

export const CHALLENGES: ChallengeOptionParent[] = [
  {
    id: "transport",
    label: "대중교통",
    label2: "이용하기",
    image: "/images/bus.png"
  },
  {
    id: "bike",
    label: "자전거",
    label2: "이용하기",
    image: "/images/bicycle.png"
  },
  {
    id: "disposable",
    label: "일회 용품",
    label2: "사용하지 않기",
    image: "/images/bag.png"
  },
  {
    id: "electricity",
    label: "전기 플래그",
    label2: "뽑기",
    image: "/images/electricity.png"
  },
  {
    id: "files",
    label: "안쓰는 디지털 파일",
    label2: "정리하기",
    image: "/images/trash.png"
  },
  {
    id: "used",
    label: "친환경 제품",
    label2: "구매하기",
    image: "/images/eco.png"
  }
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
    { id: "eco-bag", label: "에코백 사용" },
    { id: "reusable-container", label: "일회용 제품 사용 안하기" },
    { id: "reusable-paper", label: "종이, 실리콘 빨대 사용하기" },
    { id: "Multi-use", label: "다회용 포장 용기 사용하기" }
  ],
  electricity: [
    { id: "standby-power", label: "대기전력 차단" },
    { id: "unused-plug", label: "미사용 전기 플래그 뽑기" }
  ],
  files: [
    { id: "delete-files", label: "불필요한 파일 삭제" },
    { id: "organize-folders", label: "폴더 정리" },
    { id: "cloud-cleanup", label: "클라우드 정리" }
  ],
  used: [
    { id: "eco-friendly", label: "친환경 인증 제품 사용하기" },
    { id: "eco-store", label: "친환경 가게 방문하기" }
  ]
};

// profileSmall 키 추가했습니다
export const LEVEL_CONFIG = {
  1: {
    name: "씨앗",
    min: 0,
    max: 10000,
    image: "/images/seed.png",
    profile: "/images/profile1.png",
    profileSmall: "/images/profileSmall1.png",
    bg: "#321C00",
    exp: "#FFD64E"
  },
  2: {
    name: "새싹",
    min: 10000,
    max: 20000,
    image: "/images/sesac.png",
    profile: "/images/profile2.png",
    profileSmall: "/images/profileSmall2.png",
    bg: "#320008",
    exp: "#FF738F"
  },
  3: {
    name: "트리모아",
    min: 20000,
    max: 30000,
    image: "/images/treemoa.png",
    profile: "/images/profile3.png",
    profileSmall: "/images/profileSmall3.png",
    bg: "#00320F",
    exp: "#0D9C36"
  },
  4: {
    name: "클로비",
    min: 30000,
    max: 40000,
    image: "/images/clover.png",
    profile: "/images/profile4.png",
    profileSmall: "/images/profileSmall4.png",
    bg: "#000132",
    exp: "#28B0FB"
  }
} as const;

export const DAY_OF_THE_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
