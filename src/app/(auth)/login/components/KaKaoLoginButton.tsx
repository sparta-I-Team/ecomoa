"use client";
import { signInWithKakao } from "../../actions";

const KaKaoLoginButton = () => {
  const handleLogin = async () => {
    const redirectUrl = await signInWithKakao();
    if (redirectUrl) {
      window.location.href = redirectUrl; // 클라이언트에서 리다이렉트
    }
  };
  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default KaKaoLoginButton;
