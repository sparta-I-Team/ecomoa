import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <main>
      <Link href="/community/anabada">
        <h3 className="text-lg font-bold mb-2 mt-2">{"< 아나바다 시장 홈 "}</h3>
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      <article className="flex">
        <Image src="" alt="이미지" width={585} height={585} priority />
        <div className="flex flex-col ml-8 w-[585px]">
          <label className="text-[22px] mb-2">인형</label>
          <label className="text-[38px] font-bold">10000원</label>
          <div className="flex text-base text-gray-500 tracking-tight">
            <label>닉네임 - </label>
            <time>2024.11.04</time>
            <div className="ml-2">- ♡ 11</div>
            <div className="ml-2">- 댓글 11</div>
          </div>
          <div className="mb-4 mt-4 w-[585px] h-px bg-[#D5D7DD]"></div>
          <div className="mb-6 w-[585px] flex flex-col h-full">
            <p className="text-[14px] text-[#6E7481] font-semibold mb-4">
              상품정보
            </p>
            <p className="text-[14px] font-normal mb-5">
              한번도 빨지 않은 인형입니다
            </p>
            <label>거래 희망 지역</label>
            <label className="mb-2 inline-block rounded-[32px] border border-[#D5D7DD] p-2">
              수송동
            </label>

            <button className="mt-auto flex justify-center items-center gap-[10px] w-[380px] h-[52px] p-[24px] px-[16px]">
              채팅하기
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Page;
