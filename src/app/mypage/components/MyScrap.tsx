"use client";
import {
  getBookmarkAnabada,
  getBookmarkPosts,
  getMyPosts,
  getUserInfo
} from "@/api/user-action";
import Like from "@/app/community/components/Like";
import { MyBookmark } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MyScrap = () => {
  const { user } = userStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("free"); // 선택된 탭 상태

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  // 자유게시판에서 스크랩한 게시물 가져오기
  const { data: myScrap, isLoading } = useQuery<MyBookmark[] | null>({
    queryKey: ["myScrap", user.id],
    queryFn: () => getBookmarkPosts(user.id),
    enabled: selectedTab === "free" && !!user.id
  });
  console.log("내가 작성한 자유게시판 게시글", myScrap);

  //   아나바다 게시판에서 스크랩한 게시물 가져오기
  const { data: anabada, isLoading: anabadaLoading } = useQuery<
    MyBookmark[] | null
  >({
    queryKey: ["myAnabadaScrap", user.id],
    queryFn: () => getBookmarkAnabada(user.id),
    enabled: !!user.id
  });
  console.log("아나바다ㅔ시판내용", anabada);

  // 각 스크랩 게시물의 작성자 정보 가져오기

  const scrapData = selectedTab === "free" ? myScrap : anabada;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ width: "1200px" }}>
      <Link href="/community/free" passHref>
        <button className="mt-[76.5px] mb-[36px] mx-auto w-[1200px] h-12 border-b-1 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
          마이페이지
        </button>
      </Link>
      <div className="flex mb-4">
        <Link href="/mypage/bookmark" passHref>
          <button
            onClick={() => setSelectedTab("free")}
            className="w-[600px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center"
          >
            자유 게시판
          </button>
        </Link>
        <Link href="/mypage/bookmark/anabada" passHref>
          <button
            onClick={() => setSelectedTab("anabada")}
            className="w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]"
          >
            아나바다 시장
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <label>{myScrap?.length} 건</label>
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
            {selected === "likes" && <span className="text-black mr-1">✔</span>}
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
      </div>
      <div className="flex flex-col h-[620px] overflow-y-auto mb-4">
        {isLoading && <p>로딩 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {myScrap?.map((scrap) => (
          <article
            key={scrap.bookmark_id}
            className="w-full h-[220px] border-b border-black flex flex-row p-4"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/community/free/${scrap.post_id}`}>
                  {scrap.posts.post_title}
                </Link>
              </h2>
              <p>{scrap.posts.post_content}</p>

              <div className="mb-4 mt-5">
                <label className="bg-[#D9D9D9]">{scrap.writername}님</label>
                <time>
                  {new Date(scrap.posts.created_at).toLocaleDateString()}
                </time>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex space-x-4">
                  <Like postId={scrap.post_id} />
                  <label>댓글 {scrap.posts.comment || 0}</label>
                </div>
              </div>
            </div>
            {scrap.posts.post_img && scrap.posts.post_img.length > 0 && (
              <div className="flex-none w-[160px] h-[160px] ml-4 flex flex-wrap gap-1">
                <Image
                  key={0}
                  src={scrap.posts.post_img[0]}
                  alt="Post image"
                  width={160}
                  height={160}
                  className="object-contain h-full rounded"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default MyScrap;
