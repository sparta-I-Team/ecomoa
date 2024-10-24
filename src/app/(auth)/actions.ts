"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// 로그인
export async function login(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.log("로그인 오류", error);
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.log("유저 정보 가져오기 오류:", userError);
  } else {
    console.log("로그인된 유저:", userData.user); // 유저 정보 출력
  }
  redirect("/");
}

// 회원가입
export async function signup(formData: FormData) {
  const supabase = createClient();
  const data: SignUpWithPasswordCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        nickname: formData.get("nickname") as string
      }
    }
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.error("회원가입 에러", error);
  }
  redirect("/login");
}
