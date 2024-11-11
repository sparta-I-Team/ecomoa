"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { communityApi } from "@/api/communityApi";
import { Post } from "@/types/community";

type Props = {
  params: {
    Id: string; // 동적 경로에서 받은 게시글 ID
  };
};

const Page = ({ params }: Props) => {
  const [post, setPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { Id } = params; // URL 파라미터에서 게시글 ID를 추출합니다.

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    // if (!id) return; // id가 없으면 API 호출을 하지 않음
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

  const images = post.post_img ?? [];
  const hasMultipleImages = images.length > 1;

  return (
    <main>
      <Link href="/community/anabada">
        <h3 className="text-lg font-bold mb-2 mt-6">{"< 아나바다 시장 홈 "}</h3>
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      <article className="flex">
        {hasMultipleImages ? (
          <Slider {...settings}>
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`게시글 이미지 ${index + 1}`}
                width={585}
                height={585}
                priority
              />
            ))}
          </Slider>
        ) : (
          images.length > 0 && (
            <Image
              src={images[0]}
              alt="게시글 이미지"
              width={585}
              height={585}
              priority
            />
          )
        )}

        <div className="flex flex-col ml-8 w-[585px]">
          <label className="text-[22px] mb-2 text-[#000301]">
            {post.post_title}
          </label>
          <label className="text-[38px] font-bold">{post.price}원</label>
          <div className="flex text-base text-gray-500 tracking-tight">
            <label>{post.user_info?.user_nickname}</label>
            <time>{new Date(post.created_at).toLocaleDateString()}</time>
            <div className="ml-2">- ♡ {post.like || 0}</div>
            <div className="ml-2">- 댓글 {post.comment || 0}</div>
          </div>
          <div className="mb-4 mt-4 w-[585px] h-px bg-[#D5D7DD]"></div>
          <div className=" w-[585px] flex flex-col h-full">
            <p className="text-[14px] text-[#0D9C36] font-semibold mb-4">
              상품정보
            </p>
            <p className="text-[14px] font-normal mb-5">{post.post_content}</p>
            <label className="text-[#0D9C36]">거래 희망 지역</label>
            <label className="mb-2 inline-block rounded-[32px] border w-[100px] border-[#D5D7DD] p-2">
              {post.location}
            </label>

            <button className="bg-[#0D9C36] text-white font-normal rounded-[40px] mt-auto flex justify-center items-center gap-[10px] w-[380px] h-[52px] p-[24px] px-[16px]">
              채팅하기
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Page;
