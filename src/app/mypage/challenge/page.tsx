"use client";
import Link from "next/link";
import MyChallenge from "../components/MyChallenge";
import { ChevronLeft } from "lucide-react";

const MyChallengePage = () => {
  return (
    <div className=" bg-[#F4FFF4]">
      <div className="max-w-[1200px] mx-auto">
        {/*  */}
        <Link href={"/mypage"} className="border-b-slate-500 w-[1200]">
          <div className="flex items-center mb-[20px] pt-[62.5px]">
            <ChevronLeft />
            <span className="font-wanted text-[16px] font-[600] ">
              마이페이지
            </span>
          </div>
        </Link>
        {/*  */}
        <div className="mb-[101px]">
          <MyChallenge />
        </div>
      </div>
    </div>
  );
};

export default MyChallengePage;
