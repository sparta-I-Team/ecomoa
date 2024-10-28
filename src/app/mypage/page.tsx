import DeleteAccountButton from "../(auth)/login/components/DeleteAccountButton";
import LogoutButton from "../(auth)/login/components/LogoutButton";
import { getUser } from "@/api/auth-actions";
import UserInfoCard from "./components/UserInfoCard";
import MyPoint from "./components/MyPoint";
import Link from "next/link";
import LikePosts from "./components/LikePosts";

const Mypage = async () => {
  const user = await getUser();
  if (!user) return;

  return (
    <div className="w-1/3 flex flex-col m-auto w-full px-10">
      <h1>마이페이지</h1>
      <div className="flex flex-row justify-center gap-5">
        <UserInfoCard user={user} />
        <MyPoint user={user} />
      </div>

      <div className="border-b border-gray-400 mt-10 mb-1 flex justify-between items-center p-4">
        <Link href={"/"}>챌린지 히스토리</Link>
      </div>
      <div className="border-b border-gray-400 mb-1 flex justify-between items-center p-4">
        <Link href={"/"}>탄소계산 히스토리</Link>
      </div>
      <div className="border-b border-gray-400 mb-1 flex justify-between items-center p-4">
        <Link href={"/mypage/bookmark"}>나의 스크랩</Link>
        <LikePosts user={user} />
      </div>
      <div className="border-b border-gray-400 mb-1 flex justify-between items-center p-4">
        <Link href={"/mypage/post"}>나의 게시글</Link>
      </div>
      <div className="border-b border-gray-400 mb-1 flex justify-between items-center p-4">
        <Link href={"/"}>회원정보 수정</Link>
      </div>
      <div className="border-b border-gray-400 mb-1 flex justify-between items-center p-4">
        <Link href={"/"}>회원 탈퇴</Link>
      </div>
      <div className="mt-10">
        <DeleteAccountButton user={user} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Mypage;
