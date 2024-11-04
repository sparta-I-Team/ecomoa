"use client";
import { signInParams } from "@/api/user-action";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import Image from "next/image";

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

    const res = await supabase.auth.getSession();
    const session = res.data.session;

    if (session) {
      // Zustand 스토어에 로그인 유저 정보 저장
      loginUser({
        email: session.user.email as string,
        accessToken: session.access_token as string,
        id: session.user.id as string,
        isAuthenticated: true
      });

      await signInParams(session.user.id); // params를 false로 설정
      //   // }
      if (!session) {
        console.log("세션 x");
      }
      return session;
    }
  };
  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className="border-none btn btn-primary rounded-xl"
      >
        <Image
          src={"/images/google.png"}
          width={400}
          height={52}
          alt="google_login_btn"
        />
      </button>
    </div>
  );
};
export default GoogleLoginButton;
