"use client";

import { signInWithKakao } from "@/api/auth-actions";
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
        className="border-none btn btn-primary rounded-xl"
      >
        <Image
          src={"/images/kakao.png"}
          width={400}
          height={54}
          alt="kakao_login_btn"
        />
        <div className="flex flex-col"></div>
      </button>
    </>
  );
};
export default KaKaoLoginButton;
