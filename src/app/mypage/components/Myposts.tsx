"use client";
import { getMyPosts } from "@/api/user-action";
import Like from "@/app/community/components/Like";
import { MyPosts, MyPostsWithUserInfo } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MyPostProps {
  type: "free" | "anabada";
}
const Myposts = ({ type }: MyPostProps) => {
  const { user } = userStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 내가 작성한 게시글 가져오기
  const { data: myPosts, isLoading } = useQuery<MyPostsWithUserInfo[] | null>({
    queryKey: ["myPosts", user.id, type],
    queryFn: () => getMyPosts(user.id, type),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });
  console.log("????????", myPosts);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col" style={{ width: "1200px" }}>
        {/* <Link href="/mypage" passHref>
          <div className="">
            <ChevronLeft />
            <button className="mt-[76.5px] mb-[36px] w-[1200px] h-12 border-b-1 border-black border-t-0 border-l-0 border-r-0 font-semibold">
              마이페이지
            </button>
          </div>
        </Link> */}
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
            나의 게시글
          </p>
          <p className="text-[#00691E] font-wanted text-[20px] font-[500] leading-[30px] tracking-[-0.2px]">
            내가 작성한 게시글을 확인해보세요
          </p>
        </div>
        <div className="flex mb-4">
          <Link href="/mypage/post/free" passHref>
            <button className="w-[600px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
              자유 게시판
            </button>
          </Link>
          <Link href="/mypage/post/anabada" passHref>
            <button className="w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
              아나바다 시장
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <label>{myPosts?.length} 건</label>
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
          {/* <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
            <Link href="/community/post">게시글 작성</Link>
          </button> */}
        </div>
        <div className="flex flex-col h-[620px] overflow-y-auto mb-4">
          {isLoading && <p>로딩 중...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {myPosts?.map((post) => (
            <article
              key={post.post_id}
              className="w-full h-[220px] border-b border-black flex flex-row p-4"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/community/free/${post.post_id}`}>
                    {post.post_title}
                  </Link>
                </h2>
                <p>{post.post_content}</p>

                <div className="mb-4 mt-5">
                  <label className="bg-[#D9D9D9]">
                    {post.user_info.user_nickname}님
                  </label>
                  <time>{new Date(post.created_at).toLocaleDateString()}</time>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-4">
                    <Like postId={post.post_id} />
                    <label>댓글 {post.comment || 0}</label>
                  </div>
                </div>
              </div>
              {post.post_img && post.post_img.length > 0 && (
                <div className="flex-none w-[160px] h-[160px] ml-4 flex flex-wrap gap-1">
                  <Image
                    key={0}
                    src={post.post_img[0]}
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
    </div>
  );
};
export default Myposts;
