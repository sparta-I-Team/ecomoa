import React from "react";
import SignupForm from "./components/SignupForm";
import Image from "next/image";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#EAFCDE] px-4">
      <div className="mx-auto max-w-md flex flex-col items-center pt-12 sm:pt-20">
        <Image
          src={"/images/logo.png"}
          width={180}
          height={30}
          alt="ecomoa 로고"
          className="mb-8"
        />

        <div className="space-y-1 mb-10">
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            에코모아에 가입하고
          </h1>
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            탄소 절감 혜택을 누려보세요!
          </h1>
        </div>

        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
