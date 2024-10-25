"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SignupInput } from "./signup/components/SignupForm";
import { LoginInput } from "./login/components/LoginForm";

// 로그인
export async function login(loginInput: LoginInput) {
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
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("유저 정보 가져오기 오류:", userError);
  } else {
    console.log("로그인된 유저:", userData.user); // 유저 정보 출력
  }
  redirect("/");
}

// 회원가입
export async function signup(signupInput: SignupInput) {
  const supabase = createClient();
  const data: SignUpWithPasswordCredentials = {
    email: signupInput.email,
    password: signupInput.password,
    options: {
      data: {
        nickname: signupInput.nickname
      }
    }
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.error("회원가입 에러", error);
  } else {
    redirect("/login");
  }
}
