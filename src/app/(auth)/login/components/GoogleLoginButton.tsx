"use client";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import { getUserInfo, signInParams } from "@/api/user-action";
import { useModal } from "@/zustand/modalStore";
import { useRouter } from "next/navigation";
import NicknameModal from "./NicknameModal";

const GoogleLoginButton = () => {
  const supabase = createClient();
  const { loginUser } = userStore();
  const { openModal, closeModal } = useModal(); // 모달 상태 전역 관리
  const router = useRouter();
  // const handleOpenNicknameModal = () => {
  //   openModal(<NicknameModal onClose={closeModal} />); // closeModal 함수 전달
  // };

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

      await signInParams();

      // 사용자 정보를 가져와서 firstTag 확인
      const userInfo = await getUserInfo(session.user.id);
      if (userInfo && userInfo.params && !userInfo.params.firstTag) {
        router.push("/nickname");
        // openModal(<NicknameModal onClose={closeModal} />); // 모달 열기
      } else {
        router.push("/");
        closeModal(); // 모달 닫기 (필요시)
      }

      // const userInfo = await getUserInfo(session.user.id);
      // if (!userInfo.user_nickname) {
      //   router.push("/login/nickname");
      // }
      // if (!userInfo.user_nickname) {
      //   openModal(<NicknameModal onClose={closeModal} />); // 모달 열기
      // } else {
      //   closeModal(); // 닉네임 모달 닫기
      // }

      // 닉네임 모달을 표시하도록 상태 업데이트
      // const userInfo = await getUserInfo(session.user.id);
      // if (!userInfo.user_nickname) {
      //   openModal(<NicknameModal onClose={closeModal} />); // 모달 열기
      // } else {
      //   closeModal(); // 닉네임 모달 닫기
      // }
    } else {
      console.error("구글 로그인 세션 오류");
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle} className="btn btn-primary">
        구글 로그인
      </button>
    </div>
  );
};

export default GoogleLoginButton;
