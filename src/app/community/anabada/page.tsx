"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and ANON KEY must be defined in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Post 타입 정의
interface Post {
  user_info: { user_nickname: string };
  post_id: string;
  post_title: string;
  post_content: string;
  created_at: string;
  like: number;
  comment: number;
  post_img?: string[]; // 이미지 배열
  price: string; // 가격 추가
}

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
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("anabada")
        .select("*, user_info(user_nickname), post_img, price"); // price 필드 추가

      if (error) {
        console.error("Error fetching posts:", error);
        setError("게시글을 불러오는 데 실패했습니다.");
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
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
        <div className="flex mb-4">
          <Link href="/community" passHref>
            <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7D]">
              첼린지 인증
            </button>
          </Link>
          <Link href="/community/free" passHref>
            <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7D]">
              자유 게시판
            </button>
          </Link>
          <Link href="/community/anabada" passHref>
            <button className="w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
              아나바다 시장
            </button>
          </Link>
        </div>
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
              <article
                key={post.post_id}
                className="flex flex-col justify-end items-start p-7 w-[276px] border border-gray-200 rounded-lg shadow-md"
              >
                {post.post_img && post.post_img.length > 0 ? (
                  <div className="flex-none w-[220px] h-[220px] mb-4">
                    <Image
                      src={post.post_img[0]}
                      alt="Post image"
                      width={220}
                      height={220}
                      className="object-contain h-full rounded"
                    />
                  </div>
                ) : (
                  <div className="flex-none w-[220px] h-[220px] mb-4 bg-gray-200 flex items-center justify-center">
                    <span>이미지가 없습니다</span>
                  </div>
                )}
                <p className="mb-2">{post.post_content}</p>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/community/anabada/${post.post_id}`}>
                    {post.post_title}
                  </Link>
                </h2>
                <label className="font-bold text-[18px] text-[#191A1D]">
                  {post.price}원
                </label>

                <div className="mb-4 flex">
                  <label className="mr-1">
                    {post.user_info.user_nickname}-
                  </label>
                  <time className="block">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-4">
                    <label>♡ {post.like || 0}</label>
                    <label>댓글 {post.comment || 0}</label>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
