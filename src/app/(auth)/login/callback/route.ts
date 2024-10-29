import { createClient } from "@/utlis/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  console.log("테스트!!!!!!!!!!!!!!");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("코드------------------->", code);
  const supabase = createClient();

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("라우트---------------->", data);
    if (!error) {
      return NextResponse.redirect(`${origin}/`); // 로그인 성공 시 메인 페이지로 리다이렉트
    }
  }

  // 로그인 실패 시 메인 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/`); // 나중에 오류 페이지가 생기면 그 경로로 수정
};
