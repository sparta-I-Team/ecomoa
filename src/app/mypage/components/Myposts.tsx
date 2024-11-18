"use client";
import { getMyPosts } from "@/api/user-action";
import Like from "@/app/community/components/Like";
import PostCard from "@/app/community/components/PostCard";
import { Post } from "@/types/community";
import { TypeProps } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReturnMypage from "./ReturnMypage";
import { AnabadaPostSkeleton } from "./AnabadaPostSkeleton";
import { FreePostSkeleton } from "./FreePostSkeleton";

const Myposts = ({ type }: TypeProps) => {
  const { user } = userStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // 기본값은 최신순

  // 내가 작성한 게시글 가져오기
  const { data: myPosts, isLoading } = useQuery<Post[] | null>({
    queryKey: ["myPosts", user.id, type, sortOrder],
    queryFn: () => getMyPosts(user.id, type, sortOrder),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });

  const handleSelect = (option: string) => {
    setSelected(option);
    setSortOrder(option === "latest" ? "desc" : "asc");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full md:w-[1200px]">
        {/* 헤더 부분 스켈레톤 */}
        <div className="mx-auto">
          <ReturnMypage />
        </div>
        {/* 네비게이션 바 */}
        <div className="my-[36px] md:my-[48px]">
          <p className="text-[24px] md:text-[32px] font-[700] leading-[33.6px] md:leading-[44.8px] tracking-[-0.24px] md:tracking-[-0.2px] ml-[20px] md:ml-0">
            나의 게시글
          </p>
          <p className="mt-[16px] md:mt-[12px] text-[#00691E] font-wanted text-[16px] md:text-[20px] font-[500] leading-[24px] md:leading-[30px] tracking-[-0.16px] md:tracking-[-0.2px] ml-[20px] md:ml-0">
            내가 작성한 게시글을 확인해보세요
          </p>
        </div>
        <div className="flex mb-4 ml-[20px] md:ml-0">
          {type === "free" ? (
            <>
              <Link href="/mypage/like/free" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
                  자유 게시판
                </button>
              </Link>
              <Link href="/mypage/like/anabada" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
                  아나바다 시장
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/mypage/like/free" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
                  자유 게시판
                </button>
              </Link>

              <Link href="/mypage/like/anabada" passHref>
                <button
                  className="w-[160px] md:w-[600px] h-12 border-b-2 border-black border-t-0 border-l-0
              border-r-0 font-semibold flex items-center justify-center"
                >
                  아나바다 시장
                </button>
              </Link>
            </>
          )}
        </div>
        {/* 게시글 리스트 스켈레톤 */}
        <div className="flex flex-wrap h-[620px] overflow-y-auto mt-[30px] mb-4 gap-5 ml-[20px] md:ml-0">
          {type === "anabada"
            ? Array(8)
                .fill(null)
                .map((_, i) => <AnabadaPostSkeleton key={i} />)
            : Array(4)
                .fill(null)
                .map((_, i) => <FreePostSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto">
      <div className="flex flex-col w-full md:w-[1200px]">
        <div className="pl-[20px] md:pl-0">
          <ReturnMypage />
        </div>
        {/* 네비게이션 바 */}
        <div className="my-[36px] md:my-[48px]">
          <p className="text-[24px] md:text-[32px] font-[700] leading-[33.6px] md:leading-[44.8px] tracking-[-0.24px] md:tracking-[-0.2px] ml-[20px] md:ml-0">
            나의 게시글
          </p>
          <p className="mt-[16px] md:mt-[12px] text-[#00691E] font-wanted text-[16px] md:text-[20px] font-[500] leading-[24px] md:leading-[30px] tracking-[-0.16px] md:tracking-[-0.2px] ml-[20px] md:ml-0">
            내가 작성한 게시글을 확인해보세요
          </p>
        </div>
        <div className="flex mb-4 ml-[20px] md:ml-0">
          {type === "free" ? (
            <>
              <Link href="/mypage/post/free" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-[#00320F] border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
                  자유 게시판
                </button>
              </Link>
              <Link href="/mypage/post/anabada" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
                  아나바다 시장
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/mypage/post/free" passHref>
                <button className="w-[160px] md:w-[600px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
                  자유 게시판
                </button>
              </Link>

              <Link href="/mypage/post/anabada" passHref>
                <button
                  className="w-[160px] md:w-[600px] h-12 border-b-2 border-[#00320F] border-t-0 border-l-0
              border-r-0 font-semibold flex items-center justify-center"
                >
                  아나바다 시장
                </button>
              </Link>
            </>
          )}
        </div>
        {/* 필터링 */}
        <div className="flex justify-between items-center mb-[20px] ml-[20px] md:ml-0">
          <div className="flex space-x-4 mb-[10px]">
            <label className="text-[#00691E] font-[600] text-[16px] leading-[24px] tracking-[-0.16px]">
              {myPosts?.length} 건
            </label>
            <div
              onClick={() => handleSelect("latest")}
              className="cursor-pointer flex items-center"
            >
              {selected === "latest" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label
                className={
                  selected === "latest" ? "text-black" : "text-[#A1A7B4]"
                }
              >
                최신순
              </label>
            </div>
            <div
              onClick={() => handleSelect("oldest")}
              className="cursor-pointer flex items-center"
            >
              {selected === "oldest" && (
                <span className="text-black mr-1">✔</span>
              )}
              <label
                className={
                  selected === "oldest" ? "text-black" : "text-[#A1A7B4]"
                }
              >
                오래된순
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap overflow-y-auto gap-[12px] mx-[20px] md:mx-0">
          {isLoading && <p>로딩 중...</p>}
          {myPosts?.map((post) =>
            type === "anabada" ? (
              <div key={post.post_id} className="mx-auto">
                <PostCard key={post.post_id} post={post} type={"anabada"} />
              </div>
            ) : (
              <article
                key={post.post_id}
                className="px-[32px] py-[28px] w-[300px] md:w-full h-auto md:h-[205px] rounded-[12px] bg-[#FFF] border border-[#E8F3E8] flex flex-row md:p-4 justify-start mx-auto"
                style={{ boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.02)" }}
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      className="font-wanted text-[18px] font-[700] leading-[27px] tracking-[-0.18px] mt-[28px] mb-[20px]"
                      href={`/community/free/${post.post_id}`}
                    >
                      {post.post_title}
                    </Link>
                  </h2>
                  <p>{post.post_content}</p>

                  <div className="mb-4 mt-5">
                    <label className="mt-[16px] text-[#8A91A1] mr-[14px]">
                      {post.user_info.user_nickname}
                    </label>
                    <time className="text-[#8A91A1]">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>

                  <div className="flex justify-between items-center mt-[35px]">
                    <div className="flex space-x-4">
                      <Like postId={post.post_id} />
                      <label>댓글 {post.comment || 0}</label>
                    </div>
                  </div>
                  {post.post_img && post.post_img.length > 0 && (
                    <div className="flex flex-col md:flex-row w-[160px] h-[160px] ml-4 flex-wrap gap-1 rounded-[12px]">
                      <Image
                        key={0}
                        src={post.post_img[0]}
                        alt="Post image"
                        width={160}
                        height={160}
                        className="object-contain w-[150px] h-[150px] rounded-[12px] md:hidden mt-[12px] -ml-[50px]"
                      />
                    </div>
                  )}
                </div>
                {post.post_img && post.post_img.length > 0 && (
                  <div className="flex flex-col md:flex-row w-[160px] h-[160px] ml-4 flex-wrap gap-1 rounded-[12px]">
                    <Image
                      key={0}
                      src={post.post_img[0]}
                      alt="Post image"
                      width={160}
                      height={160}
                      className="object-contain w-[150px] h-[150px] rounded-[12px] hidden md:block"
                    />
                  </div>
                )}
              </article>
            )
          )}
        </div>
        <div className="h-[100px]"></div>
      </div>
    </div>
  );
};
export default Myposts;
