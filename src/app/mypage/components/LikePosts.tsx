"use client";
import {
  getBookmarkAnabada,
  getBookmarkPosts,
  getLikePosts
} from "@/api/user-action";
import Like from "@/app/community/components/Like";
import { LikePosts, MyBookmark } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const MyLike = () => {
  const { user } = userStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  // 자유게시판에서 스크랩한 게시물 가져오기
  //   const { data: myScrap, isLoading } = useQuery<MyBookmark[] | null>({
  //     queryKey: ["myScrap", user.id],
  //     queryFn: () => getBookmarkPosts(user.id),
  //     enabled: !!user.id
  //   });
  //   console.log("내가 작성한 자유게시판 게시글", myScrap);

  //   아나바다 게시판에서 스크랩한 게시물 가져오기
  //   const { data: anabada, isLoading: anabadaLoading } = useQuery<
  //     MyBookmark[] | null
  //   >({
  //     queryKey: ["myAnabadaScrap", user.id],
  //     queryFn: () => getBookmarkAnabada(user.id),
  //     enabled: !!user.id
  //   });
  //   console.log("아나바다ㅔ시판내용", anabada);

  const { data: likePosts, isLoading } = useQuery<LikePosts[] | null>({
    queryKey: ["likePosts", user.id],
    queryFn: () => getLikePosts(user.id),
    enabled: !!user.id
  });
  console.log("좋아요 포스트", likePosts);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Link href={"/mypage"} className="border-b-slate-500 w-[1200]">
        <div className="flex items-center mb-[20px] pt-[64.5px]">
          <ChevronLeft />
          <span className="font-wanted text-[16px] font-[600] ">
            마이페이지
          </span>
        </div>
      </Link>
      <div className="mb-[48px]">
        <p className="text-[32px] font-[700] leading-[44.8px] tracking-[-0.2px]">
          나의 좋아요
        </p>
        <p className="text-[#00691E] font-wanted text-[20px] font-[500] leading-[30px] tracking-[-0.2px]">
          좋아요한 게시글을 확인해보세요
        </p>
      </div>
      <div className="flex mb-4">
        <Link href="/mypage/like/free" passHref>
          <button
            // onClick={() => setSelectedTab("free")}
            className="w-[600px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center"
          >
            자유 게시판
          </button>
        </Link>
        <Link href="/mypage/like/anabada" passHref>
          <button
            // onClick={() => setSelectedTab("anabada")}
            className="w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]"
          >
            아나바다 시장
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* <label>{myScrap?.length} 건</label> */}
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
        {likePosts?.map((like) => (
          <article
            key={like.like_id}
            className="w-full h-[220px] border-b border-black flex flex-row p-4"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/community/free/${like.post_id}`}>
                  {like.posts.post_title}
                </Link>
              </h2>
              <p>{like.posts.post_content}</p>

              <div className="mb-4 mt-5">
                {/* <label className="bg-[#D9D9D9]">{like.writername}님</label> */}
                <time>
                  {new Date(like.posts.created_at).toLocaleDateString()}
                </time>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex space-x-4">
                  <Like postId={like.post_id} />
                  <label>댓글 {like.posts.comment || 0}</label>
                </div>
              </div>
            </div>
            {like.posts.post_img && like.posts.post_img.length > 0 && (
              <div className="flex-none w-[160px] h-[160px] ml-4 flex flex-wrap gap-1">
                <Image
                  key={0}
                  src={like.posts.post_img[0]}
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

export default MyLike;
