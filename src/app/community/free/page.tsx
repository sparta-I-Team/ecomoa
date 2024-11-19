"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/types/community";
import { communityApi } from "@/api/communityApi";
import CommunityNav from "../components/CommunityNav";
import PostCard from "../components/PostCard";
import Image from "next/image";

const Page = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    // 기본적으로 '최신순'을 설정합니다.
    setSelected("latest");

    const getPosts = async () => {
      setLoading(true);
      const { data, error } = await communityApi.getPost("free");
      if (error) {
        setError(error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    getPosts();
  }, []);

  // 검색하는 함수
  const filteredPosts = useMemo(() => {
    let sortedPosts = posts.filter((post) =>
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 정렬 로직
    if (selected === "latest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    } else if (selected === "oldest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
    }

    return sortedPosts;
  }, [posts, searchTerm, selected]);

  return (
    <>
      <div className=" bg-[#F2F9F2] min-h-full">
        <div className="py-[52px] w-full min-w-[360px] max-w-[1200px] mx-auto px-[20px] md:px-0">
          <div className="text-[20px] md:text-[26px] font-bold mb-[60px]">
            친환경 활동을 공유해 보세요
          </div>
          {/* navbar */}
          <div className="flex flex-col w-full">
            <div className="mb-[28px] flex flex-row">
              <Link href="/community" passHref>
                <div className="w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  챌린지 인증
                </div>
              </Link>
              <Link href="/community/free" passHref>
                <div className="w-[106px] md:w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  자유 게시판
                </div>
              </Link>
              <Link href="/community/anabada" passHref>
                <div className="w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px] md:text-[16px] whitespace-nowrap px-2 sm:px-4">
                  아나바다 시장
                </div>
              </Link>
            </div>
          </div>
          {/* 검색창 */}
          <div>
            <div className="relative w-[360px] mb-[32px]">
              <input
                type="text"
                placeholder="키워드를 검색해 보세요"
                className="border-none w-[320px] md:w-[380px] h-[52px] pl-[20px] rounded-[40px] bg-[#D7E8D7]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-[50px] md:right-0 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/community/search.png"
                  alt="검색"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* 순서 */}
            <div className="flex flex-row items-center mb-[20px]">
              <div className="text-[#00691E] font-semibold text-[16px] mr-6">
                {filteredPosts.length} 건
              </div>
              <div className="flex flex-row gap-4">
                <div
                  className="text-[14px] flex items-center"
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
                  className="cursor-pointer text-[14px] flex items-center"
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

            <div className="relative p-2 overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
              {loading && <p>로딩 중...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {filteredPosts.map((post) => (
                <PostCard post={post} type="free" key={post.post_id} />
              ))}
              <Link href="/community/post">
                <Image
                  src="/community/addPost.png"
                  alt="게시글 작성"
                  width={64}
                  height={64}
                  className="sticky bottom-[32px] left-[1100px] z-40"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
