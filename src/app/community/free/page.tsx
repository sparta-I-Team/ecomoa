"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/types/community";
import { communityApi } from "@/api/communityApi";
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

  const filteredPosts = useMemo(() => {
    let sortedPosts = posts.filter((post) =>
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    <div className="bg-[#F2F9F2] min-h-full">
      <div className="py-[52px] w-full min-w-[360px] max-w-[1200px] mx-auto px-[20px] md:px-0">
        <div className="text-[20px] md:text-[26px] font-bold mb-[60px]">
          친환경 활동을 공유해 보세요
        </div>

        {/* 네비게이션 */}
        <div className="mb-7 md:mb-[28px] flex border-b border-[#D5D7DD]">
          <Link href="/community" className="flex-1">
            <div className="h-12 border-b-2 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-xs md:text-base">
              챌린지 인증
            </div>
          </Link>
          <Link href="/community/free" className="flex-1">
            <div className="h-12 border-b-2 border-black text-black font-bold flex items-center justify-center text-xs md:text-base">
              자유 게시판
            </div>
          </Link>
          <Link href="/community/anabada" className="flex-1">
            <div className="h-12 border-b-2 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-xs md:text-base">
              아나바다 시장
            </div>
          </Link>
        </div>

        {/* 검색 영역 */}
        <div className="mb-8">
          <div className="relative max-w-md md:mx-0">
            <input
              type="text"
              placeholder="키워드를 검색해 보세요"
              className="w-full h-[52px] pl-5 pr-12 rounded-full bg-[#D7E8D7] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <Image
                src="/community/search.png"
                alt="검색"
                width={24}
                height={24}
              />
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center gap-4 mt-6 mb-5">
            <div className="text-[#00691E] font-semibold">
              {filteredPosts.length} 건
            </div>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-1 border-none"
                onClick={() => handleSelect("latest")}
              >
                <span
                  className={
                    selected === "latest" ? "text-black" : "text-[#A1A7B4]"
                  }
                >
                  ✔
                </span>
                <span
                  className={
                    selected === "latest" ? "text-black" : "text-[#A1A7B4]"
                  }
                >
                  최신순
                </span>
              </button>
              <button
                className="flex items-center gap-1 border-none"
                onClick={() => handleSelect("oldest")}
              >
                <span
                  className={
                    selected === "oldest" ? "text-black" : "text-[#A1A7B4]"
                  }
                >
                  ✔
                </span>
                <span
                  className={
                    selected === "oldest" ? "text-black" : "text-[#A1A7B4]"
                  }
                >
                  오래된순
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="relative pr-2 overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
          {loading && <p>로딩 중...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard post={post} type="free" key={post.post_id} />
            ))}
          </div>

          {/* 글쓰기 버튼 */}
          <Link href="/community/post">
            <Image
              src="/community/addPost.png"
              alt="게시글 작성"
              width={64}
              height={64}
              className="fixed bottom-8 right-8 z-40 hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
