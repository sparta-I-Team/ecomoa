"use server";

import { redirect } from "next/navigation";
import { SignUpWithPasswordCredentials, User } from "@supabase/supabase-js";
import { createClient } from "@/utlis/supabase/server";
import { LoginInput, SignupInput } from "@/types/authType";

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
  redirect("/");
};

// 카카오 로그인
export const signInWithKakao = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      // 이부분 경로 확인
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/google`
    }
  });
  if (error) {
    console.error("카카오 로그인 에러", error);
  }
  const session = await getSession();
  if (session) {
    // const userId = await signInParams(session?.user.id);
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

export const getSession = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// 회원탈퇴 user_info 테이블 정보 삭제
export const deleteUserInfo = async (userId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_info")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("회원탈퇴 user_info 정보 삭제 오류", error);
  }
  return;
};
