"use client";

import { signInWithKakao } from "@/api/auth-actions";
import Image from "next/image";

const KaKaoLoginButton = () => {
  const handleLogin = async () => {
    const redirectUrl = await signInWithKakao();
    if (redirectUrl) {
      window.location.href = redirectUrl; // 클라이언트에서 리다이렉트
    }
  };
  return (
    <>
      <button
        onClick={handleLogin}
        className="border-none mt-10 flex flex-col justify-center items-center"
      >
        <Image
          src={"/images/kakaobtn.png"}
          width={48}
          height={48}
          alt="kakaoBtn"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">카카오</span>
          <span className="text-lg font-semibold">로그인</span>
        </div>
      </button>
    </>
  );
};
export default KaKaoLoginButton;
