"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { communityApi } from "@/api/communityApi";
import { Post } from "@/types/community";
import Link from "next/link";

type Props = {
  params: {
    Id: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const [post, setPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { Id } = params;

  useEffect(() => {
    console.log("Id", Id);
    const fetchPost = async () => {
      try {
        const { data, error } = await communityApi.getPostById(Id);
        console.log("getPostById", data);
        if (error) {
          setErrorMessage(error);
          console.error("게시글을 불러오는 데 실패했습니다:", error);
          return;
        }

        if (data) {
          setPost(data);
        } else {
          setErrorMessage("게시글이 없습니다.");
        }
      } catch (error) {
        setErrorMessage("게시글을 불러오는 데 오류가 발생했습니다.");
        console.error("게시글을 가져오는 데 오류가 발생했습니다:", error);
      }
    };

    fetchPost();
  }, [Id]); // id가 변경될 때마다 API 호출

  if (errorMessage) {
    return (
      <div className="text-center mt-10">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <p>게시글을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-6  mx-auto w-[1200px]">
      <Link href={"/community/free"} className="mb-4 mt-4">
        {"< 자유게시판 "}
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      <article>
        <label className="text-2xl font-semibold">{post.post_title}</label>
        <div className="flex mt-4 mb-2 text-sm text-gray-600">
          <label className="mr-4">{post.user_info.user_nickname}</label>
          <label>{new Date(post.created_at).toLocaleDateString()}</label>

          <div className="flex space-x-4 text-gray-600">
            <label>♡ {post.like}</label>
            <label>스크랩 </label>
          </div>
        </div>
        <p className="mt-4 ">{post.post_content}</p>

        {/* 여러 이미지 처리 부분 */}
        {post.post_img &&
        Array.isArray(post.post_img) &&
        post.post_img.length > 0 ? (
          <div>
            <div className=" flex mt-6 gap-4">
              {post.post_img.map((img, index) => (
                <div key={index} className="max-w-[168px]">
                  <Image
                    src={img}
                    alt={`게시글 이미지 ${index + 1}`}
                    width={168}
                    height={168}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-10">
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                className="rounded-[16px] bg-[#CBF5CB] w-[1080px] h-[70px] leading-[40px] px-4 border-none text-[#A1A7B4]"
              />
              <button
                type="submit"
                className="bg-[#0D9C36] border-none rounded-[12px] text-white"
              >
                댓글 등록
              </button>
            </div>
          </div>
        ) : (
          post.post_img && (
            <div className="max-w-[168px]">
              <Image
                src={typeof post.post_img === "string" ? post.post_img : ""}
                alt="게시글 이미지"
                width={168}
                height={168}
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}
      </article>
    </div>
  );
};

export default PostDetailPage;
