import Link from "next/link";
import React from "react";

const CommunityNav = () => {
  return (
    <div>
      <div className="flex flex-col w-full mt-4 p-2">
        <div className=" mb-4 flex items-start">
          <Link href="/community" passHref>
            <button className=" w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
              첼린지 인증
            </button>
          </Link>
          <Link href="/community/free" passHref>
            <button className="w-[106px]  md:w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
              자유 게시판
            </button>
          </Link>
          <Link href="/community/anabada" passHref>
            <button className=" w-[106px] md:w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-[#D5D7DD] text-[#D5D7DD] font-bold flex items-center justify-center text-[12px]  md:text-[16px] whitespace-nowrap px-2 sm:px-4">
              아나바다 시장
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityNav;
