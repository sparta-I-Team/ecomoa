import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <h3>{"< 자유게시판 "} </h3>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      <article>
        <label>제목</label>
        <div className="flex">
          <label>닉네임</label>
          <label>2024.11.01</label>
          <label>♡ 11</label>
          <label>댓글 3</label>
        </div>
        <p>컨텐츠 내용 들어갑니다</p>
        <Image src={""} alt=""></Image>
      </article>
    </div>
  );
};

export default page;
