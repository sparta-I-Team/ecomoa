// components/GoogleLoginButton.tsx
"use client";
import { createClient } from "@/utlis/supabase/client";
import Image from "next/image";

const GoogleLoginButton = () => {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        },
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/google`
        // 경로 재설정 했음
      }
    });

    if (error) {
      console.error("Google 로그인 오류:", error);
    }
  };

  // 이쪽 밑으로 로직을 삭제 했기 때문에 확인!!

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className="border-none btn btn-primary rounded-xl"
      >
        <div className="w-[322px] md:w-[400px]">
          <Image
            src={"/images/google.png"}
            width={400}
            height={52}
            alt="google_login_btn"
          />
        </div>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
