"use server";

import { redirect } from "next/navigation";
import { SignUpWithPasswordCredentials, User } from "@supabase/supabase-js";
import { createClient } from "@/utlis/supabase/server";
import { LoginInput, SignupInput } from "@/types/authType";
import { signInParams } from "./user-action";

// 로그인
export const login = async (loginInput: LoginInput) => {
  const supabase = createClient();
  const data = {
    email: loginInput.email,
    password: loginInput.password
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.error("로그인 오류", error);
    throw new Error(error.message);
  }
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.error("유저 정보 가져오기 오류:", sessionError);
    throw new Error("유저 정보를 가져오는 중 오류가 발생했습니다.");
  }
  return sessionData;
};

// 회원가입
export const signup = async (signupInput: SignupInput) => {
  const supabase = createClient();
  const data: SignUpWithPasswordCredentials = {
    email: signupInput.email,
    password: signupInput.password
  };
  const { error } = await supabase.auth.signUp(data);
  await supabase.auth.signOut();
  if (error) {
    console.error("회원가입 에러", error);
  } else {
    await supabase.auth.signOut();
    redirect("/login");
  }
};

// 로그아웃
export const signout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("로그아웃 에러", error);
  }
  redirect("/login");
};

// 카카오 로그인
export const signInWithKakao = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "http://localhost:3000/login/callback"
    }
  });
  if (error) {
    console.error("카카오 로그인 에러", error);
  }
  const session = await getSession();
  if (session) {
    const userId = await signInParams(session?.user.id);
  }
  return data.url;
};

export const getUser = async (): Promise<User | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
  }
  return data.user;
};

// 구글 로그인
// export const signInWithGoogle = async () => {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       queryParams: {
//         access_type: "offline",
//         prompt: "consent" // 사용자 계정 선택 창 표시
//       }
//     }
//   });
//   if (error) {
//     console.error("Google OAuth 로그인 오류:", error.message);
//     return;
//   }
//   // 성공 시
//   console.log("구글 로그인 성공", data);
// };

export const getSession = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
};
