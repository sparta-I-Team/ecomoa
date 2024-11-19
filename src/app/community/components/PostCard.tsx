import { Post } from "@/types/community";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Like from "./Like";

import { useLike } from "@/hooks/useLike";

interface Props {
  post: Post;
  type: string;
}

const PostCard = ({ post, type }: Props) => {
  const { likes } = useLike(post.post_id);

  return (
    <div className="w-full">
      <Link href={`/community/${type}/${post.post_id}`}>
        {type === "free" ? (
          <article className="flex flex-col justify-between md:flex-row py-[28px] px-[32px] gap-4 rounded-lg border md:border-none border-gray-300 bg-white">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-[16px]">
                <h2 className="text-lg md:text-xl font-semibold line-clamp-2">
                  {post.post_title}
                </h2>
                <p className=" text-[16px] text-[#525660] md:text-base line-clamp-2">
                  {post.post_content}
                </p>
                <div className="flex items-center gap-2 text-[#A1A7B4] text-sm">
                  <span>{post.user_info.user_nickname}</span>
                  <span>·</span>
                  <time>{new Date(post.created_at).toLocaleDateString()}</time>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-[35px] mb-[12px] md:mb-0 md:mt-4">
                <Like postId={post.post_id} />
                <span className="text-[#0D9C36]">{likes.length}</span>
              </div>
            </div>
            <div className="h-[150px] w-2/3 md:w-[160px] md:h-[160px]  aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {post.post_img && post.post_img.length > 0 ? (
                <Image
                  src={post.post_img[0]}
                  alt={post.post_title}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  이미지가 없습니다
                </div>
              )}
            </div>
          </article>
        ) : (
          <article className="flex flex-col py-[19px] px-[28px] md:py-[28px] md:px-[28px] rounded-lg border border-[#E8F3E8] bg-white shadow-sm hover:shadow-md transition-shadow h-full">
            <div className="h-[100px] w-full md:h-full aspect-square mb-4 bg-gray-100 rounded-2xl overflow-hidden">
              {post.post_img && post.post_img.length > 0 ? (
                <Image
                  src={post.post_img[0]}
                  alt={post.post_title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  이미지가 없습니다
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
              <h2 className="text-base font-medium line-clamp-2">
                {post.post_title}
              </h2>
              <p className="text-lg font-bold">
                {post.price?.toLocaleString()}원
              </p>
              <div className="flex items-center gap-2 text-sm text-[#A1A7B4]">
                <span>{post.user_info.user_nickname}</span>
                <span>·</span>
                <time>{new Date(post.created_at).toLocaleDateString()}</time>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-[20px] md:pt-[12px]">
              <Like postId={post.post_id} />
              <span className="text-[#0D9C36] pt-[2.5px]">{likes.length}</span>
            </div>
          </article>
        )}
      </Link>
    </div>
  );
};

export default PostCard;
