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
  chall_id: string;
  selected_options: { option1: string; option2: string[] };
  image_urls: string[];
  user_id: string;
  created_at: string;
  user_info: {
    user_nickname: string;
  };
}

const Page = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    setSelected("latest");
    const fetchChallenges = async () => {
      const { data: rawData, error: fetchError } = await supabase
        .from("challenges")
        .select(
          "chall_id, selected_options, image_urls, user_id, created_at, user_info(user_nickname)"
        );

      if (fetchError) {
        console.error(
          "Challenges를 가져오는 데 오류가 발생했습니다:",
          fetchError
        );
        setError("Challenges를 가져오는 데 오류가 발생했습니다.");
      } else {
        const transformedData = (rawData as unknown as Challenge[]) || [];
        setChallenges(transformedData);
      }
    };

    fetchChallenges();
  }, []);

  // Challenges 정렬 로직
  const sortedChallenges = [...challenges].sort((a, b) => {
    if (selected === "latest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (selected === "oldest") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return 0;
  });

  return (
    <div className="bg-[#F2F9F2] min-h-full">
      <div className="py-[52px] w-full min-w-[360px] max-w-[1200px] mx-auto px-[20px] md:px-0">
        <div className="text-[20px] md:text-[26px] font-bold mb-[60px]">
          친환경 활동을 공유해 보세요
        </div>

        {/* Navbar */}
        <div className="flex flex-col w-full">
          <div className="mb-[28px] flex flex-row w-full">
            <Link href="/community" passHref className="w-1/3">
              <div className="w-full h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                챌린지 인증
              </div>
            </Link>
            <Link href="/community/free" passHref className="w-1/3">
              <div className="w-full h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                자유 게시판
              </div>
            </Link>
            <Link href="/community/anabada" passHref className="w-1/3">
              <div className="w-full h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                아나바다 시장
              </div>
            </Link>
          </div>
        </div>

        {/* 순서 */}
        <div className="flex flex-row items-center mb-[20px]">
          <div className="text-[#00691E] font-semibold text-[16px] mr-6">
            {challenges.length} 건
          </div>
          <div className="flex flex-row gap-4">
            <div
              className="text-[16px] flex items-center"
              onClick={() => handleSelect("latest")}
            >
              <span
                className={`mr-1 ${
                  selected === "latest" ? "text-black" : "text-transparent"
                }`}
              >
                ✔
              </span>
              <label
                className={`${
                  selected === "latest" ? "text-black" : "text-[#A1A7B4]"
                } cursor-pointer`}
              >
                최신순
              </label>
            </div>

            <div
              className="cursor-pointer text-[16px] flex items-center"
              onClick={() => handleSelect("oldest")}
            >
              <span
                className={`mr-1 ${
                  selected === "oldest" ? "text-black" : "text-transparent"
                }`}
              >
                ✔
              </span>
              <label
                className={`${
                  selected === "oldest" ? "text-black" : "text-[#A1A7B4]"
                } cursor-pointer`}
              >
                오래된순
              </label>
            </div>
          </div>
        </div>

        {/* Challenges */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="pr-2 overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
          {sortedChallenges.map((challenge) => {
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

            // 데일리 챌린지 갯수 구하기
            const allValues = Object.values(challenge.selected_options).flatMap(
              (category) => Object.values(category)
            );

            return (
              <Link
                href={`/community/${challenge.chall_id}`}
                key={challenge.chall_id}
              >
                <article className="flex flex-col justify-between md:flex-row min-w-[300px] md:w-full h-full p-[28px_32px] mb-4 rounded-[12px] border border-[#E8F3E8] bg-white shadow-sm ">
                  <div>
                    <div className="flex flex-col gap-5">
                      {/* 포인트 + 날짜 */}
                      <div className="flex items-center gap-2">
                        <div className="flex p-[8px_12px] justify-center text-[14px] items-center rounded-[4px] bg-[#0D9C36] w-[50px] text-white">
                          {totalPoints}P
                        </div>
                        <p className="ml-2 text-[14px] text-[#585858] whitespace-nowrap">
                          {challenge.user_info.user_nickname.slice(0, 6)}
                        </p>
                        <label className="ml-2 text-[14px] text-[#A1A7B4] whitespace-nowrap">
                          {formattedDate}
                        </label>
                      </div>

                      {/* 모바일에서만 보이는 챌린지 태그 */}
                      <div className="flex w-[80px] h-[32px] mb-4 rounded-[32px] border border-[#D5D7DD] bg-[white] text-[14px] flex-wrap md:hidden justify-center items-center group relative">
                        <div>
                          <Image
                            src={"/images/challenge_icon.svg"}
                            alt="challenge_icon"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                        </div>
                        <div>+ {allValues.length}</div>

                        {/* 툴팁 */}
                        <div className="absolute hidden group-hover:block bg-black text-white text-[12px] py-1 px-2 rounded-lg bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {allValues}
                        </div>
                      </div>

                      {/* 태그 */}
                      <div className="flex items-start content-start gap-2 flex-wrap md:flex hidden">
                        {Object.entries(challenge.selected_options).map(
                          ([category, selectedIds]) =>
                            (selectedIds as string[]).map((id) => {
                              const option = CHALLENGE_OPTIONS[category].find(
                                (opt) => opt.id === id
                              );
                              const imgSrc = CHALLENGES.find(
                                (challenge) => challenge.id === category
                              )?.image;

                              return (
                                <div key={id}>
                                  <span className="flex py-4 px-4 mb-2 rounded-[32px] border border-[#D5D7DD] bg-[white] text-[14px] flex-wrap">
                                    {imgSrc && (
                                      <Image
                                        src={imgSrc}
                                        alt="아이콘"
                                        width={12}
                                        height={12}
                                        className="mr-2"
                                      />
                                    )}
                                    {option?.label}
                                  </span>
                                </div>
                              );
                            })
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {challenge.image_urls &&
                      challenge.image_urls.length > 0 && (
                        <div className="flex">
                          <Image
                            key={0}
                            src={challenge.image_urls[0]}
                            alt={`Challenge 1`}
                            width={148}
                            height={148}
                            className="object-cover w-[148px] h-[148px] rounded-[12px]"
                          />
                        </div>
                      )}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Page;
