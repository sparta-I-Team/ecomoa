"use client";

import { signInWithKakao } from "@/api/auth-actions";
import { getUserInfo } from "@/api/user-action";
import { useModalStore } from "@/zustand/modalStore";
import { userStore } from "@/zustand/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const KaKaoLoginButton = () => {
  const router = useRouter();
  const { user } = userStore();
  const { openModal } = useModalStore();

  const handleLogin = async () => {
    const redirectUrl = await signInWithKakao(); // 경로 재설정 했음 signInWithKakao 함수 확인
    if (redirectUrl) {
      // const user = await signInParams(); // 여기서 user 정보를 가져옴

      if (user && userInfo?.params.firstTag === false) {
        // firstTag가 false일 경우 모달 열기
        console.log(userInfo);
        openModal(
          <div className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center bg-white">
            <p className="text-center text-lg font-semibold mb-4">
              닉네임을 설정해주세요!
            </p>
            <form /* 닉네임 입력 폼 추가 */>
              {/* 닉네임 입력 필드와 닉네임 설정 버튼 추가 */}
            </form>
          </div>,
          "",
          0
        );
      } else {
        router.push(redirectUrl); // firstTag가 false가 아닐 경우 리다이렉트
      }
    }
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className="border-none btn btn-primary rounded-xl"
      >
        <Image
          src={"/images/kakao.png"}
          width={400}
          height={54}
          alt="kakao_login_btn"
        />
        <div className="flex flex-col"></div>
      </button>
    </>
  );
};
export default KaKaoLoginButton;
