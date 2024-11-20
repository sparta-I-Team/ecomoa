import Link from "next/link";
import React from "react";
import ReturnMypage from "./ReturnMypage";

interface Props {
  type: string;
  listType: string;
}

const PostListSkeleton = ({ type, listType }: Props) => {
  return (
    <div className="flex flex-col max-w-[1200px] mx-auto md:px-[20px]">
      <div className="pl-[20px] md:pl-0">
        <ReturnMypage />
      </div>

      {listType === "myLike" ? (
        <div className="my-[48px]">
          <p className="text-[24px] md:text-[32px] font-[700] leading-[33.6px] md:leading-[44.8px] tracking-[-0.24px] md:tracking-[-0.2px] pl-[20px] md:pl-0">
            나의 좋아요
          </p>
          <p className="mt-[12px] text-[#00691E] text-[16px] md:text-[20px] font-[500] leading-[30px] tracking-[-0.2px] pl-[20px] md:pl-0">
            내가 좋아요한 게시글을 확인해보세요
          </p>
        </div>
      ) : (
        <div className="my-[48px]">
          <p className="text-[24px] md:text-[32px] font-[700] leading-[33.6px] md:leading-[44.8px] tracking-[-0.24px] md:tracking-[-0.2px] pl-[20px] md:pl-0">
            나의 게시글
          </p>
          <p className="mt-[12px] text-[#00691E] text-[16px] md:text-[20px] font-[500] leading-[30px] tracking-[-0.2px] pl-[20px] md:pl-0">
            내가 작성한 게시글을 확인해보세요
          </p>
        </div>
      )}

      <div className="px-[20px] md:px-0 flex mb-4">
        {type === "free" ? (
          <>
            <Link
              href="/mypage/like/free"
              className="flex items-center justify-center w-1/2 border-b-2 border-black border-t-0 border-l-0 border-r-0"
            >
              <button className="h-12 border-none font-[600]">
                자유 게시판
              </button>
            </Link>
            <Link
              href="/mypage/like/anabada"
              className="flex items-center justify-center w-1/2 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD]"
            >
              <button className="h-12 border-none text-[#D5D7DD]">
                아나바다 시장
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/mypage/like/free"
              className="flex items-center justify-center w-1/2 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD]"
            >
              <button className="h-12 border-none text-[#D5D7DD]">
                자유 게시판
              </button>
            </Link>
            <Link
              href="/mypage/like/anabada"
              className="flex items-center justify-center w-1/2 border-b-2 border-black border-t-0 border-l-0 border-r-0"
            >
              <button className="h-12 border-none font-[600]">
                아나바다 시장
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="h-6 bg-gray-200 rounded w-[180px] mb-[32px] ml-[20px]" />
      <div className="h-[calc(100vh-360px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
        <div
          className={`
            ${
              type === "anabada"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-[20px]"
                : "grid gap-4 px-[20px]"
            } 
          `}
        >
          {type === "anabada"
            ? Array(8)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col py-[19px] px-[28px] md:py-[28px] md:px-[28px] rounded-lg border border-[#E8F3E8] bg-white shadow-sm h-full"
                  >
                    <div className="h-[100px] w-full md:h-[220px] aspect-square mb-4 bg-gray-200 rounded-2xl" />
                    <div className="flex flex-col gap-[8px] flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-6 bg-gray-200 rounded w-1/2" />
                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-24" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-[20px] md:pt-[12px]">
                      <div className="h-5 bg-gray-200 rounded w-[40px]" />
                    </div>
                  </div>
                ))
            : Array(4)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row py-[18px] px-[32px] gap-4 rounded-lg bg-white"
                  >
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col gap-[14px]">
                        <div className="h-7 bg-gray-200 rounded w-2/4" />
                        <div className="h-5 bg-gray-200 rounded w-1/3" />
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-gray-200 rounded w-24" />
                          <div className="h-4 bg-gray-200 rounded w-24" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-[35px] mb-[12px] md:mb-0 md:mt-4">
                        <div className="h-5 bg-gray-200 rounded w-[40px]" />
                      </div>
                    </div>
                    <div className="h-[100px] w-[140px] md:w-[160px] md:h-[160px] aspect-square bg-gray-200 rounded-2xl" />
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default PostListSkeleton;
