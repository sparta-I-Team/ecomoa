import { Post } from "@/types/community";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Like from "./Like";

interface Props {
  post: Post;
  type: string;
}

const PostCard = ({ post, type }: Props) => {
  return (
    <div className="p-2">
      {type === "free" ? (
        <Link href={`/community/free/${post.post_id}`}>
          <article
            key={post.post_id}
            className="md:w-full md:h-[220px] border-b flex flex-col gap-[20px] md:gap-0 md:flex-row p-4 mb-4 rounded-[12px] border border-[#E8F3E8] bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.02)]"
          >
            <div className="flex-1 rounded-[12px]">
              <h2 className="text-xl font-semibold mb-2">{post.post_title}</h2>

              <p className="mt-4 leading-normal ellipsis-multi-line truncate">
                {post.post_content.slice(0, 10)}...
              </p>

              <div className="mb-4 mt-4 text-[#A1A7B4]">
                <label>{post.user_info.user_nickname}.</label>
                <time>{new Date(post.created_at).toLocaleDateString()}</time>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex space-x-4">
                  <Like postId={post.post_id} />
                  {/* 좋아요 개수 표시 */}
                  <span className="text-sm text-[#A1A7B4]">{post.like}개</span>
                </div>
              </div>
            </div>

            {post.post_img && post.post_img.length > 0 && (
              <div className="flex-none w-[160px] h-[160px] md:ml-4 flex flex-wrap gap-1">
                <Image
                  key={0}
                  src={post.post_img[0]}
                  alt="Post image"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </article>
        </Link>
      ) : (
        <Link href={`/community/${type}/${post.post_id}`}>
          <article
            key={post.post_id}
            className="flex flex-col justify-end items-start p-7 w-[276px] bg-white rounded-lg "
          >
            {post.post_img && post.post_img.length > 0 ? (
              <div className="flex-none w-[220px] h-[220px] mb-4">
                <div className="w-[220px] h-[220px]">
                  <Image
                    src={post.post_img[0]}
                    alt="Post image"
                    width={220}
                    height={220}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-none w-[220px] h-[220px] mb-4 bg-gray-200 flex items-center justify-center">
                <span>이미지가 없습니다</span>
              </div>
            )}

            <p className="mb-2">{post.post_content}</p>
            <h2 className="text-xl font-semibold mb-2">{post.post_title}</h2>

            <label className="font-bold text-[18px] text-[#191A1D]">
              {post.price}원
            </label>

            <div className="mb-4 flex mt-4">
              <label className="mr-1">{post.user_info.user_nickname}-</label>
              <time className="block">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-4">
                <Like postId={post.post_id} />
                {/* 좋아요 개수 표시 */}
                <span className="text-[14px] text-[#0D9C36]">{post.like}</span>
              </div>
            </div>
          </article>
        </Link>
      )}
    </div>
  );
};

export default PostCard;
