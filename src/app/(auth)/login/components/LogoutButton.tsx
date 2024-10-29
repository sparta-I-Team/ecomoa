"use client";

import { signout } from "@/api/auth-actions";
import { userStore } from "@/zustand/userStore";

const LogoutButton = () => {
  const { logoutUser } = userStore();
  const handleLogout = () => {
    const isConfirmed = window.confirm("정말 로그아웃하시겠습니까?");
    if (isConfirmed) {
      // 사용자가 OK를 클릭했을 경우
      signout();
      // userStore 초기화
      logoutUser();
    }
  };
  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
