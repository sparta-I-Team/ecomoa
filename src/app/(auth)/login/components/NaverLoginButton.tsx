"use client";
import Image from "next/image";
import React from "react";

const NaverLoginButton = () => {
  const handleNaverLogin = () => {
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/naverdf`
    );
    const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const state = "your_state_value"; // CSRF 공격 방지용 상태값

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=${state}`;
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="border-none btn btn-primary rounded-xl"
    >
      <div className="w-[322px] md:w-[400px]">
        <Image
          src={"/images/naver.png"}
          width={400}
          height={52}
          alt="naver_login_btn"
        />
      </div>
    </button>
  );
};

export default NaverLoginButton;
