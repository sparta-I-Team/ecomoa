export async function fetchUserDataFromNaver(code: string) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!;
  const redirectURI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/naver`;

  // 액세스 토큰 요청
  const tokenResponse = await fetch(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${encodeURIComponent(
      redirectURI
    )}`,
    { method: "GET" }
  );

  const tokenData = await tokenResponse.json();

  // 액세스 토큰으로 사용자 데이터 가져오기
  const userResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const userData = await userResponse.json();
  return userData;
}
