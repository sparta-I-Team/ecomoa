import React from "react";
import SignupForm from "./components/SignupForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#FFF] px-4">
      <div className="w-[1200px] mx-auto">
        <div className="flex items-center mb-[20px] pt-[76px]">
          <ChevronLeft />
          <Link href={"/login"} className="text-[#525660]">
            <span className="font-wanted text-[16px] font-[600]">
              로그인 홈
            </span>
          </Link>
        </div>
        <div className=" w-full border-b border-b-[#D5D7DD]"></div>
        <p className="mt-[48px] font-wanted text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px] text-[#000301]">
          이메일 회원가입
        </p>
        <p className="text-[#00691E] font-wanted text-[20px] font-[500] leading-[30px] tracking-[-0.2px] mt-[24px]">
          가입을 위한 이메일 정보를 입력해주세요
        </p>
        <div className="mx-auto max-w-md flex flex-col items-center mt-[120px]">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
