"use client";
import { signInWithKakao } from "@/api/auth-actions";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";

const KaKaoLoginButton = () => {
  const { loginUser } = userStore();
  const router = useRouter();
  const handleLogin = async () => {
    const url = await signInWithKakao();
    console.log(url);
    if (url) {
      const supabase = createClient();
      const data = await supabase.auth.getSession();
      console.log(data);
      const response = data.data;
      console.log(response);
      // zustand 스토어에 사용자 정보 저장
      loginUser({
        email: response?.session?.user.email as string,
        accessToken: response.session?.access_token as string,
        id: response.session?.user.id as string,
        isAuthenticated: true
      });

      router.push("/");
    } else {
      console.error("로그인 실패: 유효하지 않은 응답");
    }
  };
  // const user = await getUser();
  // if (!user) return;
  // await saveUserInfo(user?.user_metadata);
  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default KaKaoLoginButton;
