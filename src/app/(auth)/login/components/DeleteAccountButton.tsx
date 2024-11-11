"use client";

import { deleteUser } from "@/api/delete-action";
import { userStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";

interface DeleteAccountProps {
  userId: string;
}

const DeleteAccountButton = ({ userId }: DeleteAccountProps) => {
  const router = useRouter();
  const { logoutUser } = userStore();
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("회원 탈퇴하시겠습니까?");
    if (isConfirmed) {
      console.log("유저아이디ㅇㅇㅇㅇㅇ", userId);
      await deleteUser(userId);
      // router.push("/");
      logoutUser();

      // const response = await fetch("/api/auth", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ userId })
      // });

      // console.log("response : ", response);

      // if (!response.ok) {
      //   throw new Error("서버 오류 회원 탈퇴 실패 : ");
      // }

      localStorage.removeItem("userInfo"); // 강제로 localStorage에서 삭제
      userStore.persist.clearStorage(); // Zustand의 상태도 초기화
      logoutUser();

      router.push("/"); // 페이지 이동 후
      setTimeout(() => {
        window.location.reload(); // 페이지 새로 고침
      }, 500); // 잠시 대기 후 새로 고침
    }
  };
  return (
    // className="text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]

    <button
      className="border-none text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]"
      onClick={handleDeleteAccount}
    >
      회원 탈퇴
    </button>
  );
};

export default DeleteAccountButton;
