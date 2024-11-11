"use client";

import { deleteUserInfo, signout } from "@/api/auth-actions";
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
      await Promise.all([
        deleteUser(userId),
        deleteUserInfo(userId),
        signout(),
        logoutUser()
      ]);
      router.push("/"); // 페이지 이동 후
    }
  };
  return (
    <button
      className="flex items-center justify-center bg-[#0D9C36] rounded-[40px] h-[60px] text-[#FFF] p-[24px_16px] border-none text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]"
      onClick={handleDeleteAccount}
    >
      회원 탈퇴
    </button>
  );
};

export default DeleteAccountButton;
