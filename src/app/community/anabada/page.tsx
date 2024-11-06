"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { communityApi } from "@/api/communityApi";
import PostCard from "../components/PostCard";
import { Post } from "@/types/community";
import CommunityNav from "../components/CommunityNav";

const Page = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [posts, setPosts] = useState<AnaPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const { data, error } = await communityApi.getPost("anabada");
      console.log(data);
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
    if (!searchTerm) return posts; // 검색어가 없을 경우 모든 게시글 반환
    return posts.filter((post) =>
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div>
      <label className="text-xl font-bold mb-4 mt-4">
        친환경 활동을 공유해 보세요
      </label>
      <div className="flex flex-col" style={{ width: "1200px" }}>
        <CommunityNav />
        <input
          type="text"
          placeholder="키워드를 검색해 보세요"
          className="w-[380px] h-[52px] p-[19px] border-b border-[#191A1D] focus:outline-none placeholder:text-[#191A1D]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <label>{filteredPosts.length} 건</label>
            <div
              onClick={() => handleSelect("latest")}
              className="cursor-pointer flex items-center"
            >
              {selected === "latest" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label>최신순</label>
            </div>
            <div
              onClick={() => handleSelect("popular")}
              className="cursor-pointer flex items-center"
            >
              {selected === "popular" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label>인기순</label>
            </div>
            <div
              onClick={() => handleSelect("likes")}
              className="cursor-pointer flex items-center"
            >
              {selected === "likes" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label>좋아요</label>
            </div>
            <div
              onClick={() => handleSelect("comments")}
              className="cursor-pointer flex items-center"
            >
              {selected === "comments" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label>댓글순</label>
            </div>
          </div>
          <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
            <Link href="/community/postAna">게시글 작성</Link>
          </button>
        </div>
        <div className="flex flex-col h-[620px] overflow-y-auto mb-4">
          {loading && <p>로딩 중...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-wrap gap-6">
            {filteredPosts.map((post) => (
              <PostCard post={post} type="anabada" key={post.post_id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
