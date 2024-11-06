"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { ChallengeOption } from "@/types/challengesType";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Challenge {
  selected_options: { option1: string; option2: string };
  image_urls: string[];
  user_id: string;
  created_at: string;
}

// const OPTION_TRANSLATIONS: Record<string, string> = {
//   bus: "버스",
//   subway: "지하철",
//   train: "기차",
//   "public-bike": "공공자전거",
//   "personal-bike": "개인자전거",
//   tumbler: "텀블러 사용",
//   "eco-bag": "장바구니 사용",
//   "reusable-container": "다회용기 사용",
//   "standby-power": "대기전력 차단",
//   "unused-plug": "미사용 플러그 뽑기",
//   "delete-files": "불필요한 파일 삭제",
//   "organize-folders": "폴더 정리",
//   "cloud-cleanup": "클라우드 정리",
//   "eco-friendly": "친환경 인증 제품",
//   "second-hand": "중고 제품",
//   "local-product": "지역 생산 제품"
// };

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

const Page = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data, error: fetchError } = await supabase
        .from("challenges")
        .select("selected_options, image_urls, user_id, created_at");

      if (fetchError) {
        console.error(
          "Challenges를 가져오는 데 오류가 발생했습니다:",
          fetchError
        );
        setError("Challenges를 가져오는 데 오류가 발생했습니다.");
      } else {
        const sortedData = (data || []).sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setChallenges(sortedData);
      }
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  return (
    <div>
      <label className="text-xl font-bold mb-4 mt-4">
        친환경 활동을 공유해 보세요
      </label>
      <div className="flex flex-col" style={{ width: "1200px" }}>
        <div className="flex mb-4">
          <Link href="/community" passHref>
            <button className="w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center">
              첼린지 인증
            </button>
          </Link>
          <Link href="/community/free" passHref>
            <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
              자유 게시판
            </button>
          </Link>
          <Link href="/community/anabada" passHref>
            <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
              아나바다 시장
            </button>
          </Link>
        </div>

        {loading && <p>로딩 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {challenges.map((challenge, index) => {
          const createdAtDate = new Date(challenge.created_at);
          const formattedDate = createdAtDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })
            .replace(/\./g, ".");

          const selectedCount = Object.values(
            challenge.selected_options
          ).filter((option) => option).length;
          const totalPoints = selectedCount * 100;

          return (
            <article
              key={index}
              className="w-full h-[220px] border-b border-black flex flex-row p-4"
            >
              <div className="flex-1">
                <div className="mb-4">
                  <label className="mr-2 bg-[#D9D9D9]">{totalPoints}p</label>
                  <label>{formattedDate}</label>
                  <div className="p-2 mt-2">
                    {Object.entries(challenge.selected_options).map(
                      ([key, value]) => {
                        console.log("key", key);
                        console.log("value", value);
                        const tags = CHALLENGE_OPTIONS[key].filter((option) => {
                          return option.id === value;
                        });
                        console.log("tags", tags);

                        return <div>임시</div>;
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-none ml-4">
                {challenge.image_urls && challenge.image_urls.length > 0 && (
                  <div className="flex space-x-2">
                    {challenge.image_urls.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        alt={`Challenge ${idx + 1}`}
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
