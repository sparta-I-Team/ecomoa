"use client";
import { signout } from "@/api/auth-actions";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const { loginUser, user, logoutUser } = userStore();
  const pathname = usePathname();

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

  return (
    <header className="bg-[#0D9C36]">
      <nav
        className="max-w-[1200px] mx-auto flex flex-row justify-between"
        aria-label="Main Navigation"
      >
        <ul className="flex h-20">
          <li className="relative w-[100px] h-full">
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
            <>
              <li>
                <Link href="/login" className="hover:text-gray-600">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-600">
                  회원가입
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/mypage" className="hover:text-gray-600">
                  마이페이지
                </Link>
              </li>
              <li>
                <button
                  className="border-none hover:text-gray-600"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
