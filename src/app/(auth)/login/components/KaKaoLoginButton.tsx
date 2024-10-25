"use client";
import { signInWithKakao } from "@/api/actions";
import { useRouter } from "next/navigation";

const KaKaoLoginButton = () => {
  const router = useRouter();
  const handleLogin = async () => {
    const redirectUrl = await signInWithKakao();
    if (redirectUrl) {
      router.push(redirectUrl);
    }

    // const user = await getUser();
    // if (!user) return;
    // await saveUserInfo(user?.user_metadata);
  };
  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default KaKaoLoginButton;
