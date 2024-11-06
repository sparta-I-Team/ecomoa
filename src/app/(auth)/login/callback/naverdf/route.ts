import { createClient } from "@/utlis/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createClient(); // Supabase 클라이언트 생성
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // 코드와 상태가 없는 경우 로그인 페이지로 리다이렉트
  if (!code || !state) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Naver API를 통해 액세스 토큰을 얻습니다.
  const accessToken = await getNaverAccessToken(code);
  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/login?error=failed_to_authenticate", req.url)
    );
  }

  // Naver API로부터 사용자 정보를 가져옵니다.
  const userData = await fetchUserDataFromNaver(accessToken);
  if (!userData) {
    return NextResponse.redirect(
      new URL("/login?error=failed_to_fetch_user_data", req.url)
    );
  }

  // Supabase에서 사용자를 가져옵니다.
  const { data: existingUser, error: fetchUserError } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_email", userData.email)
    .single();

  if (fetchUserError && fetchUserError.code !== "PGRST116") {
    console.error("Failed to fetch user:", fetchUserError);
    return NextResponse.json(
      { error: fetchUserError.message },
      { status: 500 }
    );
  }

  if (existingUser) {
    console.log(existingUser);

    // 사용자가 이미 존재하는 경우 로그인
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: "temporary-password" // 임시 비밀번호
    });

    if (loginError) {
      console.error("Supabase signIn error:", loginError);
      return NextResponse.json({ error: loginError.message }, { status: 500 });
    }
  } else {
    // 사용자가 존재하지 않는 경우 회원가입
    const { error: signUpError } = await supabase.auth.signUp({
      email: userData.email,
      password: "temporary-password" // 임시 비밀번호
    });

    if (signUpError) {
      console.error("Supabase signUp error:", signUpError);
      return NextResponse.json({ error: signUpError.message }, { status: 500 });
    }

    // 자동 로그인
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: "temporary-password"
    });

    if (loginError) {
      console.error("Supabase signIn error:", loginError);
      return NextResponse.json({ error: loginError.message }, { status: 500 });
    }
  }

  // 로그인 성공 시 대시보드로 리다이렉트
  return NextResponse.redirect(
    new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/naver`, req.url)
  );
}

// Naver API에서 액세스 토큰을 얻는 함수
async function getNaverAccessToken(code: string) {
  const response = await fetch(`https://nid.naver.com/oauth2.0/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
      code: code
      // redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/naver`
    }).toString()
  });

  if (!response.ok) {
    console.error("Failed to obtain access token from Naver");
    return null;
  }

  const data = await response.json();
  return data.access_token; // 액세스 토큰 반환
}

// Naver API에서 사용자 정보를 가져오는 함수
async function fetchUserDataFromNaver(accessToken: string) {
  const response = await fetch(`https://openapi.naver.com/v1/nid/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.error("Failed to fetch user data from Naver");
    return null;
  }

  const data = await response.json();
  return data.response; // Naver API의 응답에서 사용자 정보 반환
}
