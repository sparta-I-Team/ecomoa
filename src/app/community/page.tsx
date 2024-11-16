"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { CHALLENGE_OPTIONS, CHALLENGES } from "@/utlis/challenge/challenges";
import { Modal } from "@/components/shared/Modal";

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
  chall_id: string;
}

const Page = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data, error: fetchError } = await supabase
        .from("challenges")
        .select("chall_id,selected_options, image_urls, user_id, created_at");

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
    };

    fetchChallenges();
  }, []);

  return (
    <div className="bg-[white] py-[52px] md:bg-[#E8F3E8]">
      <div className="w-[1200px] mx-auto ">
        <div>
          <label className="text-[#000301] leading-[140%] font-wanted-sans text-[20px] md:text-[26px] font-bold  md:tracking-[-0.26px]">
            친환경 활동을 공유해 보세요
          </label>
          <div className="flex flex-col w-full mt-4">
            <div className=" mb-4 flex items-start">
              <Link href="/community" passHref>
                <button className=" w-[160px]  md:w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  첼린지 인증
                </button>
              </Link>
              <Link href="/community/free" passHref>
                <button className=" w-[160px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  자유 게시판
                </button>
              </Link>
              <Link href="/community/anabada" passHref>
                <button className=" w-[160px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  아나바다 시장
                </button>
              </Link>
            </div>
            <div>
              <label className="text-[#00691E] leading-[150%] text-[16px] tracking-[-0.16px] font-bold">
                건
              </label>
              <label className="text-[#000301] leading-[150%] font-wanted text-[14px] font-[500] tracking-[-0.14px]">
                최신순
              </label>
              <label className="text-[#A1A7B4] leading-[150%] font-wanted text-[14px] font-[500] tracking-[-0.14px]">
                오래된순
              </label>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {/* Challenges List with Scroll */}
            <div className="p-4  overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
              {" "}
              {/* Add scrollable container */}
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
                  <Link
                    href={`/community/${challenge.chall_id}`}
                    key={challenge.chall_id}
                  >
                    <article
                      key={index}
                      className=" p-4 w-[300px]  h-[576px] flex-col flex-start md:w-full md:h-[220px] flex md:flex-row  mb-4 rounded-[12px] border border-[#E8F3E8] bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex-1">
                        <div className="mb-4">
                          <div className="flex items-center">
                            <label className="flex p-2 items-center gap-2.5 rounded-[4px] bg-[#0D9C36] w-[50px] text-white">
                              {totalPoints}P
                            </label>
                            <label className="ml-2 text-[#A1A7B4]">
                              {formattedDate}
                            </label>
                          </div>
                          <div className="flex items-start content-start gap-2 mt-4 flex-wrap">
                            {Object.entries(challenge.selected_options).map(
                              (selected) => {
                                const [category, selectedIds] = selected as [
                                  string,
                                  string[]
                                ];
                                return (
                                  <div key={category}>
                                    {selectedIds.map((id) => {
                                      const option = CHALLENGE_OPTIONS[
                                        category
                                      ].find((opt) => opt.id === id);
                                      const imgSrc = CHALLENGES.filter(
                                        (challenge) => challenge.id === category
                                      )[0].image;

                                      return (
                                        <div key={id}>
                                          <span className="flex py-4 px-4 mb-2 rounded-[32px] border border-[#D5D7DD] bg-[white] text-[14px] flex-wrap">
                                            <Image
                                              src={imgSrc}
                                              alt="아이콘"
                                              width={12}
                                              height={12}
                                              className="mr-2"
                                            />
                                            {option?.label}
                                          </span>
                                        </div>
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
                        {challenge.image_urls &&
                          challenge.image_urls.length > 0 && (
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
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Page;
