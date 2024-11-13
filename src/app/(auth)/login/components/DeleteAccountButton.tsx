"use client";

import { deleteReason, signout } from "@/api/auth-actions";
import { deleteUser } from "@/api/delete-action";
import { userStore } from "@/zustand/userStore";

interface DeleteAccountProps {
  userId: string;
  selectedReason: string;
  disabled: boolean;
}

const DeleteAccountButton = ({
  userId,
  selectedReason,
  disabled
}: DeleteAccountProps) => {
  const { logoutUser } = userStore();

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("회원 탈퇴하시겠습니까?");
    if (isConfirmed) {
      await Promise.all([
        deleteUser(userId),
        // deleteUserInfo(userId),
        deleteReason(userId, selectedReason),
        signout(),
        logoutUser()
      ]);
      alert("회원 탈퇴가 완료되었습니다.");
    }
  };
  return (
    <button
      className="font-wanted flex items-center justify-center font-[600] text-[#525660] bg-[#D7E8D7] hover:bg-[#0D9C36] hover:text-[#FFF] rounded-[40px] h-[60px] p-[24px_16px] border-none font-wanted text-[18px] leading-normal tracking-[-0.18px]"
      onClick={handleDeleteAccount}
      disabled={disabled}
    >
      회원 탈퇴
    </button>
  );
};

export default DeleteAccountButton;
