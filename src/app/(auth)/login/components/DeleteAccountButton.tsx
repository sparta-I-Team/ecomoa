"use client";

import { deleteUserInfo } from "@/api/auth-actions";
import { deleteUser } from "@/api/delete-action";
import { useRouter } from "next/navigation";

interface DeleteAccountProps {
  userId: string;
}

const DeleteAccountButton = ({ userId }: DeleteAccountProps) => {
  const router = useRouter();
  const handleDeleteAccount = async () => {
    try {
      const isConfirmed = window.confirm("회원 탈퇴하시겠습니까?");
      if (isConfirmed) {
        await deleteUser(userId);
        await deleteUserInfo(userId);
        router.push("/login");
      }
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <button className="border-none" onClick={handleDeleteAccount}>
      회원 탈퇴
    </button>
  );
};

export default DeleteAccountButton;
