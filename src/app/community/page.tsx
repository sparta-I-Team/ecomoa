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
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

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
    <div className=" py-[52px] md:bg-[#E8F3E8]  ">
      <div className=" md:w-[1200px] mx-auto w-[360px] min-[320px] p-2 md:p-0 flex-wrap">
        <div>
          <label className="text-[#000301] leading-[140%]  text-[20px] md:text-[26px] font-bold  md:tracking-[-0.26px]">
            친환경 활동을 공유해 보세요
          </label>
          <div className="flex flex-col w-full mt-4 p-2">
            <div className=" mb-4 flex items-start ">
              <Link href="/community" passHref>
                <button className=" w-[106px]  md:w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  첼린지 인증
                </button>
              </Link>
              <Link href="/community/free" passHref>
                <button className=" w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  자유 게시판
                </button>
              </Link>
              <Link href="/community/anabada" passHref>
                <button className=" w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  아나바다 시장
                </button>
              </Link>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <label className="text-[#00691E] text-base font-semibold leading-6">
                  {challenges.length} 건
                </label>
                <div
                  onClick={() => handleSelect("latest")}
                  className="cursor-pointer flex items-center text-sm font-medium leading-5"
                >
                  {selected === "latest" && (
                    <span className="text-black mr-1">✔</span>
                  )}
                  <label>최신순</label>
                </div>
                <div
                  onClick={() => handleSelect("oldest")}
                  className="cursor-pointer flex items-center text-sm font-medium leading-5"
                >
                  {selected === "oldest" && (
                    <span className="text-black mr-1">✔</span>
                  )}
                  <label>오래된순</label>
                </div>
                {/* <div
                  onClick={() => handleSelect("popular")}
                  className="cursor-pointer flex items-center text-sm font-medium leading-5"
                >
                  {selected === "popular" && (
                    <span className="text-black mr-1">✔</span>
                  )}
                  <label>인기순</label>
                </div>
                <div
                  onClick={() => handleSelect("likes")}
                  className="cursor-pointer flex items-center text-sm font-medium leading-5"
                >
                  {selected === "likes" && (
                    <span className="text-black mr-1">✔</span>
                  )}
                  <label>좋아요</label>
                </div>
                <div
                  onClick={() => handleSelect("comments")}
                  className="cursor-pointer flex items-center text-sm font-medium leading-5"
                >
                  {selected === "comments" && (
                    <span className="text-black mr-1">✔</span>
                  )}
                  <label>댓글순</label>
                </div> */}
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="p-2 overflow-y-auto md:max-h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
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
                      className=" tracking-wide  p-4 w-[300px]   flex-col flex-start md:w-full md:h-[220px] flex md:flex-row  mb-4 rounded-[12px] border border-[#E8F3E8] bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.02)]"
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
