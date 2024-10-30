"use client";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";

const GoogleLoginButton = () => {
  const supabase = createClient();
  const { loginUser } = userStore();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });

    if (error) {
      console.error("Google 로그인 오류:", error);
      return;
    }
    console.log(error);
    const res = await supabase.auth.getSession();
    const session = await res.data.session;
    if (session) {
      // Zustand 스토어에 로그인 유저 정보 저장
      loginUser({
        email: session.user.email as string,
        accessToken: session.access_token as string,
        id: session.user.id as string,
        isAuthenticated: true
      });
      //   console.log("Google 로그인 성공:", session);
    } else {
      console.error("구글 로그인 세션 오류");
    }
  };

  return (
    <button onClick={signInWithGoogle} className="btn btn-primary">
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
