import Link from "next/link";
import React from "react";

const CommunityNav = () => {
  return (
    <div>
      <div className="flex mb-4">
        <Link href="/community" passHref>
          <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
            첼린지 인증
          </button>
        </Link>
        <Link href="/community/free" passHref>
          <button className="w-[400px] h-12 border-b-2 border-black border-t-0 border-l-0 border-r-0 font-semibold flex items-center justify-center">
            자유 게시판
          </button>
        </Link>
        <Link href="/community/anabada" passHref>
          <button className="w-[400px] h-12 border-b-2 border-t-0 border-l-0 border-r-0 border-#D5D7DD text-[#D5D7DD]">
            아나바다 시장
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityNav;
