"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { CHALLENGE_OPTIONS } from "@/utlis/challenge/challenges";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Challenge {
  selected_options: { option1: string; option2: string[] };
  image_urls: string[];
  user_id: string;
  created_at: string;
}

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
    <div className=" bg-[#F2F9F2]">
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
                      (selected) => {
                        const [category, selectedIds] = selected as [
                          string,
                          string[]
                        ];
                        return (
                          <div key={category}>
                            {selectedIds.map((id) => {
                              const option = CHALLENGE_OPTIONS[category].find(
                                (opt) => opt.id === id
                              );
                              return (
                                <span
                                  className="mb-2 inline-block rounded-[32px] border border-[#D5D7DD] p-2"
                                  key={id}
                                >
                                  {option?.label}
                                </span>
                              );
                            })}
                          </div>
                        );
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
