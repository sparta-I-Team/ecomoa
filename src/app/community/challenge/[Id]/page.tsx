"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { CHALLENGE_OPTIONS, CHALLENGES } from "@/utlis/challenge/challenges";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Challenge {
  chall_id: string;
  selected_options: { [key: string]: string[] };
  image_urls: string[];
  user_id: string;
  created_at: string;
}

const ChallengeDetailPage = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const challId = pathname.split("/").pop();

  useEffect(() => {
    if (!challId) return;

    const fetchChallengeDetails = async () => {
      const { data, error: fetchError } = await supabase
        .from("challenges")
        .select("chall_id, selected_options, image_urls, user_id, created_at")
        .eq("chall_id", challId)
        .single();

      if (fetchError) {
        console.error(
          "Challenge를 가져오는 데 오류가 발생했습니다:",
          fetchError
        );
        setError("Challenge를 가져오는 데 오류가 발생했습니다.");
      } else {
        setChallenge(data);
      }
    };

    fetchChallengeDetails();
  }, [challId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!challenge) {
    return <div>로딩 중...</div>;
  }

  const createdAtDate = new Date(challenge.created_at);
  const formattedDate = createdAtDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long"
    })
    .replace(/\./g, "")
    .replace(/(\d{4}) (\w{1,2}) (\d{1,2}) (\w+)/, "$1년 $2월 $3일 $4");

  const selectedCount = Object.values(challenge.selected_options).filter(
    (option) => option.length > 0
  ).length;
  const totalPoints = selectedCount * 100;

  return (
    <div className="mt-8 w-[1200px]  mx-auto">
      <Link href={"/community"}>{"< 첼린지 인증 "}</Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD] mt-4"></div>

      <div className="flex items-center gap-2">
        <label className="flex p-[12px_16px] justify-center items-center gap-2.5 rounded-[4px] bg-[#0D9C36] text-white">
          {totalPoints}P
        </label>
        <label>{formattedDate}</label>
        <label>데일리 첼린지</label>
      </div>

      <article className="mb-8">
        <div className="mb-4">
          <div className="p-2 mt-2 flex flex-col gap-4">
            {Object.entries(challenge.selected_options).map(
              ([category, selectedIds]) => {
                const findLabelByCategory = (category: string) => {
                  return CHALLENGES.find((item) => item.id === category);
                };
                const categoryName = findLabelByCategory(category)?.label;
                return (
                  <div key={category} className="mb-4">
                    <h3 className="font-semibold">{categoryName}</h3>
                    <div className="flex flex-col space-y-2 mt-4">
                      {selectedIds.map((id) => {
                        const option = CHALLENGE_OPTIONS[category]?.find(
                          (opt) => opt.id === id
                        );
                        return (
                          <label
                            key={id}
                            className="mb-2 inline-block rounded-[32px] border border-[#D5D7DD] p-2 w-fit"
                          >
                            {option?.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex space-x-2">
            {challenge.image_urls.map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`Challenge ${idx + 1}`}
                width={180}
                height={180}
                className="object-cover rounded-[12px]"
              />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ChallengeDetailPage;
