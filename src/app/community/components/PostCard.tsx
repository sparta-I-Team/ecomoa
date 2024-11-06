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
    <div>
      {type === "free" ? (
        <article
          key={post.post_id}
          className="w-full h-[220px] border-b flex flex-row p-4 "
        >
          <div className="flex-1 rounded-[12px] ">
            <div className="mb-4">
              <label className="bg-[#D9D9D9]">
                {post.user_info?.user_nickname}님
              </label>
              <time>{new Date(post.created_at).toLocaleDateString()}</time>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/community/free/${post.post_id}`}>
                {post.post_title}
              </Link>
            </h2>
            <p>{post.post_content}</p>
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
      ) : (
        <article
          key={post.post_id}
          className="flex flex-col justify-end items-start p-7 w-[276px] bg-white rounded-lg "
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
            <label className="mr-1">{post.user_info?.user_nickname}-</label>
            <time className="block">
              {new Date(post.created_at).toLocaleDateString()}
            </time>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex space-x-4">
              <Like postId={post.post_id} />
              <label>댓글 {post.comment || 0}</label>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostCard;
