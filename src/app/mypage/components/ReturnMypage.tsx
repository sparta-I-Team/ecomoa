import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const ReturnMypage = () => {
  return (
    <>
      <Link href={"/mypage"}>
        <div className="flex items-center mb-[20px] pt-[64.5px]">
          <ChevronLeft />
          <span className="font-wanted text-[16px] font-[600]">마이페이지</span>
        </div>
      </Link>
      <div className=" w-full border-b border-b-[#D5D7DD]"></div>
    </>
  );
};

export default ReturnMypage;
