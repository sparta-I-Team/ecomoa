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
          <div className="flex items-center mb-[20px] pt-[64.5px]">
            <ChevronLeft />
            <span className="font-wanted text-[16px] font-[600] ">
              마이페이지
            </span>
          </div>
        </Link>
        {/*  */}
        <p className="mt-[48px] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
          이번달 나의 탄소 절감 발자취를 확인해 보세요.
        </p>
        <div className="mb-[101px]">
          <MyChallenge />
        </div>
      </div>
    </div>
  );
};

export default MyChallengePage;
