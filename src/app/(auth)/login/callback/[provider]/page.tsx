"use client";

import { Modal } from "@/components/shared/Modal";
import { useNickname } from "@/hooks/useNickname";
import { useUserInfo } from "@/hooks/useUserInfo";
import { createClient } from "@/utlis/supabase/client";
import { useModalStore } from "@/zustand/modalStore";
import { userStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const supabase = createClient();
  const { data: userInfo } = useUserInfo();
  const { loginUser } = userStore();
  const { openModal } = useModalStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    onSubmit,
    handleSubmit,
    handleChange,
    register,
    errors,
    onClickClose,
    inputLength
  } = useNickname();

  useEffect(() => {
    const handleAuth = async () => {
      // 소셜 로그인, 이메일 로그인 상관 없이 이 페이지를 거치면
      // getSession을 통해서 로그인 유저의 정보를 가져와서 Zustand의 전역 상태를 업데이트함
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          console.log("세션 :", session);

          loginUser({
            email: session.user.email as string,
            accessToken: session.access_token as string,
            id: session.user.id as string,
            isAuthenticated: true
          });

          setIsAuthenticated(true);
          // => 로그인이 성공적으로 완료 된 상태일 때 true로 설정해서 후에 닉네임 설정 모달창 오픈에 관여함
        }
      } catch (error) {
        console.error("로그인 에러:", error);
        router.push("/login");
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      //먼저 로그인된 상태인지 확인함
      // 로그인 중이라면 firstTag(닉네임 설정 여부)가 false일 때 닉네임 설정 모달창 오픈
      if (userInfo?.params?.firstTag === false) {
        openModal(
          <form
            onSubmit={handleSubmit(onSubmit)}
            // => 이 handleSubmit이 실행될 때 다음 모달창이 열리도록 설정해놨기 때문에 useNickName로직 확인 해야함
            className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white"
          >
            <div className="relative w-full">
              <button
                type="button"
                onClick={onClickClose}
                className="absolute border-none -top-10 right-10 text-lg"
              >
                X
              </button>
            </div>
            <div className="text-center h-[71px] mb-[78px] leading-[1.5] text-[32px] font-semibold">
              <p className="">만나서 반갑습니다.</p>
              <div className="flex flex-row text-center">
                <p className="text-[#5BCA11]">닉네임</p>
                <p>을 설정해주세요!</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="nickname"
                className=" w-[400px] h-[56px] p-[0px_20px] rounded-[12px] border border-[#9c9c9c] mb-[74px] placeholder:text-[16px] flex justify-between items-center"
                {...register("nickname")}
                maxLength={20}
                placeholder="ex. 홍길동"
                onChange={handleChange}
              />
              {/* 글자 수 표시 */}
              <span className="text-[#6E7481] absolute top-5 right-3 text-[16px]">
                {inputLength}/20
              </span>
              <p
                role="alert"
                className={`absolute top-14 left-1 text-sm ${
                  errors.nickname ? "text-red-600" : "text-[#6E7481]"
                }`}
              >
                {errors.nickname
                  ? errors.nickname.message
                  : "모지, 특수문자(-,_제외)를 사용할 수 없습니다."}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none"
              >
                가입완료
              </button>
            </div>
          </form>,
          "",
          0
        );
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, isAuthenticated]);

  return (
    <div>
      {/* 스켈레톤 UI (로딩처리) */}
      <div>
        <section className="mb-[280px] h-[533px] mx-auto flex justify-center">
          <div className="w-[1800px] bg-gray-200 animate-pulse rounded-lg" />
        </section>
        <section className="flex flex-col items-center justify-center gap-[80px] mb-[280px]">
          <div className="w-[327px] h-[63.33px] bg-gray-200 animate-pulse rounded-md" />
          <div className="flex flex-col gap-4 items-center">
            <div className="h-[36px] w-[700px] bg-gray-200 animate-pulse rounded-md" />
            <div className="h-[36px] w-[500px] bg-gray-200 animate-pulse rounded-md" />
            <div className="h-[36px] w-[600px] bg-gray-200 animate-pulse rounded-md" />
          </div>
        </section>
      </div>

      {/* 모달 */}
      <Modal />
    </div>
  );
};

export default AuthCallback;
