"use client";
import React from "react";

const NaverLoginButton = () => {
  const handleNaverLogin = () => {
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/naver`
    );
    const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const state = "your_state_value"; // CSRF 공격 방지용 상태값

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=${state}`;
  };

  return <button onClick={handleNaverLogin}>Naver로 로그인하기</button>;
};

export default NaverLoginButton;
