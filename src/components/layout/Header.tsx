"use client";
import { signout } from "@/api/auth-actions";
import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { calculateLevelInfo } from "@/utlis/challenge/levelCalculator";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const { loginUser, user, logoutUser } = userStore();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navItems = [
    { href: "/challenge", label: "데일리 챌린지" },
    { href: "/calculator", label: "탄소 계산기" },
    { href: "/map", label: "친환경 가게 Map" },
    { href: "/community", label: "커뮤니티" }
  ];

  const handleLogout = async () => {
    await signout();
    logoutUser();
    alert("로그아웃 되었습니다.");
  };

  const supabase = createClient();
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION") {
    }
    if (event === "SIGNED_IN") {
      loginUser({
        email: session?.user.email as string,
        accessToken: session?.access_token as string,
        id: session?.user.id as string,
        isAuthenticated: true
      });
    }
  });

  // 유저 이미지 가지고 오기
  const levelInfo = calculateLevelInfo(userInfo?.user_point ?? 0);

  useEffect(() => {
    const getUserFetch = async () => {
      const res = await getUserInfo(user.id);
      setUserInfo(res);
    };
    getUserFetch();
  }, [user]);

  return (
    <header className="bg-[#0D9C36]">
      <nav
        className="max-w-[1200px] mx-auto flex flex-row justify-between"
        aria-label="Main Navigation"
      >
        <ul className="flex justify-center items-center h-20">
          <li className="relative w-[100px] h-[20px]">
            <Link href="/">
              <Image
                src="/images/ecomoa2.png"
                alt="에코모아로고"
                fill
                className="object-contain"
              />
            </Link>
          </li>
          <div className="flex flex-row justify-center items-center space-x-4 ml-14 text-white text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`p-2 rounded-full border transition-colors
                  ${
                    pathname.includes(item.href)
                      ? "border-white text-white font-bold"
                      : "border-transparent text-white hover:text-gray-300 hover:border-gray-300"
                  }
                `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </div>
        </ul>
        <ul className="flex flex-row justify-center items-center space-x-4">
          {!user.isAuthenticated ? (
            <ul className="flex flex-row justify-center items-center gap-[32px] text-white">
              <li className="flex flex-row justify-center items-center gap-[9px]"></li>
              <li>
                <Link href="/login" className="hover:text-gray-300">
                  <button className="border-none rounded text-[14px] bg-[#00691E] w-[80px] h-[28px] ">
                    로그인
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row justify-center items-center gap-[32px] text-white">
              <li className="flex flex-row justify-center items-center gap-[9px]">
                <figure className="w-[28px] h-[28px] rounded-full bg-[#00691E]">
                  <Image
                    src={levelInfo.profileSmall}
                    alt="프로필 이미지"
                    width={28}
                    height={28}
                  />
                </figure>
                <Link
                  href="/mypage"
                  className="text-[14px] hover:text-gray-300"
                >
                  마이페이지
                </Link>
              </li>
              <li>
                <button
                  className="border-none rounded text-[14px] bg-[#00691E] w-[80px] h-[28px] hover:text-gray-300"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
