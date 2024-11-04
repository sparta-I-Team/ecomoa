import DeleteAccountButton from "../(auth)/login/components/DeleteAccountButton";
import LogoutButton from "../(auth)/login/components/LogoutButton";
import { getUser } from "@/api/auth-actions";
import UserInfoCard from "./components/UserInfoCard";
import MyPoint from "./components/MyPoint";
import Link from "next/link";
import LikePosts from "./components/LikePosts";
import { getUserInfo } from "@/api/user-action";

const Mypage = async () => {
  const user = await getUser();
  if (!user) return;
  await getUserInfo(user.id);
  const userId = user.id;
  return (
    <div className="flex flex-col m-auto max-w-[1200px]">
      <h1 className="mt-[89px] font-semibold text-[24px] mb-6">마이페이지</h1>
      <div className="flex flex-row justify-center gap-5">
        <UserInfoCard user={user} />
        <MyPoint user={user} />
      </div>

      <Link
        href={"/"}
        className="w-full h-[14px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
      >
        <p className="font-[18px]">챌린지 히스토리</p>
      </Link>

      <Link
        href={"/"}
        className="w-full h-[14px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
      >
        <p className="font-[18px]">탄소계산 히스토리</p>
      </Link>
      <Link
        href={"/mypage/bookmark"}
        className="w-full h-[14px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
      >
        <p className="font-[18px]">나의 스크랩</p>
        <LikePosts user={user} />
      </Link>
      <Link
        href={"/mypage/post"}
        className="w-full h-[14px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
      >
        <p className="font-[18px]">나의 게시글</p>
      </Link>
      <div className="w-full h-[14px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center">
        <DeleteAccountButton userId={userId} />
      </div>

      <div className="mt-10">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Mypage;
