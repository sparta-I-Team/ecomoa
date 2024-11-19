import { Post } from "@/types/community";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Like from "./Like"; // 좋아요 컴포넌트
import { useLike } from "@/hooks/useLike";

interface Props {
  post: Post;
  type: string;
}

const PostCard = ({ post, type }: Props) => {
  // const [likeCount, setLikeCount] = useState(post.like || 0);
  const { likes } = useLike(post.post_id);

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
                  <p> {likes.length}</p>
                  <Like postId={post.post_id} />
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
            className="flex flex-col justify-end items-start md:p-[28px] w-[270px] md:w-[276px] bg-white rounded-lg"
          >
            {post.post_img && post.post_img.length > 0 ? (
              <div className="flex-none w-[220px] h-[220px] mb-4">
                  <Image
                    src={post.post_img[0]}
                    alt="Post image"
                    width={220}
                    height={220}
                    className="object-cover w-full h-full rounded-2xl"
                  />
              </div>
            ) : (
              <div className="flex-none w-[220px] h-[220px] mb-4 bg-gray-200 flex items-center justify-center rounded-2xl">
                <span>이미지가 없습니다</span>
              </div>
            )}
            <div className="flex flex-col gap-[18px]">
              <h2 className="pt-[8px] text-[16px]">{post.post_title}</h2>
              <label className="font-bold text-[18px] text-[#191A1D]">
                {post.price}원
              </label>

              <div className="flex flex-row gap-[2px] text-[14px] text-[#A1A7B4]">
                <label>{post.user_info.user_nickname}</label>
                <p>·</p>
                <time className="block">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
              <div className="flex justify-between items-center mt-[12px]">
                <div className="flex flex-row gap-[2px]">
                  <Like postId={post.post_id} />
                  <p className="text-[#0D9C36] mt-[2.5px]"> {likes.length}</p>
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}
    </div>
  );
};

export default PostCard;
