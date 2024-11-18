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
      <div className="bg-[white] py-[52px] md:bg-[#E8F3E8]">
        <div className="md:w-[1200px] mx-auto w-[360px] p-2 md:p-0">
          <label className="text-[#000301] leading-[140%] font-wanted-sans text-[20px] md:text-[26px] font-bold  md:tracking-[-0.26px]">
            친환경 활동을 공유해 보세요
          </label>
          <div className="flex flex-col w-full">
            <CommunityNav />
            <div className="md:bg-[#E8F3E8] bg-[white] ">
              <div className="relative w-[360px] h-[52px] md:mt-4 ">
                <input
                  type="text"
                  placeholder="검색"
                  className=" mb-2 border-none md:w-[360px] w-[320px] h-[52px] pl-[20px] rounded-[40px] bg-[#D7E8D7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-[60px] md:right-[20px] top-1/2 transform -translate-y-1/2 ">
                  <Image
                    src="/community/search.png"
                    alt="검색"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                  <label className="text-[#00691E] text-base font-semibold leading-6">
                    {filteredPosts.length} 건
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
      </div>
    </>
  );
};

export default Page;
