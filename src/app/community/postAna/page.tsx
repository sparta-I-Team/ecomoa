"use client";
import React from "react";
import Link from "next/link";

import PostForm from "../components/PostForm";
import { useCommunity } from "@/hooks/useCommunity";
import { Modal } from "@/components/shared/Modal";

const PostFree = () => {
  const { userInfo, errorMessage } = useCommunity();

  return (
    <div className="w-[1200px] mx-auto">
      <Link href="/community/anabada">
        <h3 className="text-lg font-bold mb-4">{"< 아나바다 시장 홈 "} </h3>
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      {userInfo?.user_nickname && (
        <div className="flex items-center mb-4">
          <label className="font-bold">상품 등록</label>
          <time className="ml-4">{new Date().toLocaleDateString("ko-KR")}</time>
        </div>
      )}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <PostForm type="anabada" />
      <Modal />
    </div>
  );
};

export default PostFree;
