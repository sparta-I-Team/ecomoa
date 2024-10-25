import React from "react";

const Page = () => {
  return (
    <div>
      <label className="text-xl font-bold mb-4 mt-4">주제별 커뮤니티</label>
      <div className="flex flex-col" style={{ width: "1200px" }}>
        <div className="flex mb-4">
          <button className="w-[400px] h-12 bg-[#B9BDC7] border border-black border-b-0 font-semibold ">
            첼린지 인증
          </button>
          <button className="w-[400px] h-12 border border-black font-semibold">
            정보 공유
          </button>
          <button className="w-[400px] h-12 border border-black font-semibold">
            아나바다 시장
          </button>
        </div>
        <label className="text-lg mb-2">총 n건</label>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <label>최신순</label>
            <label>인기순</label>
            <label>좋아요</label>
            <label>댓글순</label>
          </div>
          <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
            게시글 작성
          </button>
        </div>
        <div className="flex h-screen mb-4 flex-col">
          {/* DB 연결 시 보이게 될 화면 얼추 구현 */}
          <article className="w-[1200px] h-[220px] border-b  border-black flex flex-col  p-4  bg-[#EDEEF0]">
            <h2 className="text-xl font-semibold mb-2">제목</h2>
            <p>DB연결해야함,,</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-4">
                <label>댓글 n개</label>
                <label>좋아요 n개</label>
              </div>
              <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
                저장하기
              </button>
            </div>
          </article>
          <article className="w-[1200px] h-[220px] border-b  border-black flex flex-col  p-4  ">
            <h2 className="text-xl font-semibold mb-2">제목</h2>
            <p>DB연결해야함,,</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-4">
                <label>댓글 n개</label>
                <label>좋아요 n개</label>
              </div>
              <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
                저장하기
              </button>
            </div>
          </article>
          <article className="w-[1200px] h-[220px] border-b  border-black flex flex-col  p-4  ">
            <h2 className="text-xl font-semibold mb-2">제목</h2>
            <p>DB연결해야함,,</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-4">
                <label>댓글 n개</label>
                <label>좋아요 n개</label>
              </div>
              <button className="ml-4 bg-[#D9D9D9] h-10 w-36 rounded">
                저장하기
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Page;
