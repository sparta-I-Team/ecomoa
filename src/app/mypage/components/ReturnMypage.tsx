import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const ReturnMypage = () => {
  return (
    <>
      <Link href={"/mypage"}>
        <div className="w-full flex items-center mb-[16px] md:mb-[20px] pt-[36px] md:pt-[64px]">
          <ChevronLeft />
          <span className="text-[16px] leading-[22.4px] tracking-[-0.16px] font-[600]">
            마이페이지
          </span>
        </div>
      </Link>
      <div className="w-full border-b border-b-[#D5D7DD]"></div>
    </>
  );
};

export default ReturnMypage;
