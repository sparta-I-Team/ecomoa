"use client";

import { getUser, signInWithKakao } from "@/api/auth-actions";
import { signInParams } from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const KaKaoLoginButton = () => {
  const router = useRouter();
  const handleLogin = async () => {
    const redirectUrl = await signInWithKakao();
    if (redirectUrl) {
      // const user = await getUser();
      // if (user) {
      //   await signInParams(user.id);
      // }
      router.push(redirectUrl);
      // window.location.href = redirectUrl; // 클라이언트에서 리다이렉트
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
