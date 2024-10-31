"use client";
import { createClient } from "@/utlis/supabase/client";
import { userStore } from "@/zustand/userStore";
import { getUserInfo, signInParams } from "@/api/user-action";
import { useModal } from "@/zustand/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "inspector/promises";

const GoogleLoginButton = () => {
  const supabase = createClient();
  const { loginUser } = userStore();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (userId: string) => signInParams(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    },
    onError: (error) => {
      console.log(error);
      // throw new Error(error);
    }
  });
  // const { openModal, closeModal } = useModal(); // 모달 상태 전역 관리

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

    // console.log(res);
    // console.log(session);
    // if (session) {
    //   // Zustand 스토어에 로그인 유저 정보 저장
    //   loginUser({
    //     email: session.user.email as string,
    //     accessToken: session.access_token as string,
    //     id: session.user.id as string,
    //     isAuthenticated: true
    //   });
    //   const queryClient = useQueryClient();
    //   const { mutate } = useMutation({
    //     mutationFn: (userId: string) => getUserInfo(userId),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: ["user"]
    //       });
    //     }
    //   });
    //   // params에 firstTag가 없을 때만 false 설정
    //   // await signInParams(session.user.id);

    //   // const userInfo = await getUserInfo(session.user.id);
    //   // if (!userInfo.params || Object.keys(userInfo.params).length === 0) {
    //   //   mutate(session.user.id);
    //   // await signInParams(session.user.id); // params를 false로 설정
    //   // }
    if (!session) {
      console.log("세션 x");
    }
    if (session) {
      mutateAsync(session?.user.id);
      console.log(session);
      signInParams(session?.user.id);
    }
    // } else {
    //   console.error("구글 로그인 세션 오류", error);
    // }
    return session;
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
