import React from "react";
import LoginForm from "../components/LoginForm";
import Image from "next/image";

const EmailLoginPage = () => {
  return (
    <div
      className="min-h-screen bg-[#F2F9F2] px-4 bg-none sm:bg-[url('/images/background.png')] sm:bg-no-repeat sm:bg-cover sm:bg-center"
      style={{
        backgroundSize: "2421px 1255px",
        backgroundPosition: "-245px 90px"
      }}
    >
      <div className="mx-auto max-w-md flex flex-col items-center sm:pt-20 ">
        <Image
          src={"/images/logo.png"}
          width={180}
          height={30}
          alt="ecomoa 로고"
          className="mt-[140px] mb-[40px]"
        />
        <div className="space-y-1">
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            에코모아에 가입하고
          </h1>
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            탄소 절감 혜택을 누려보세요!
          </h1>
        </div>

        <div className="w-full mt-[130px] sm:mt-[88px] flex items-center mb-[20px]">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-[16px] leading-[24px] px-4 font-wanted text-base text-[#525660] font-extrabold">
            이메일 로그인하기
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default EmailLoginPage;
