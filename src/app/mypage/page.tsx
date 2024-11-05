import DeleteAccountButton from "../(auth)/login/components/DeleteAccountButton";
import LogoutButton from "../(auth)/login/components/LogoutButton";
import { getUser } from "@/api/auth-actions";
import UserInfoCard from "./components/UserInfoCard";
import MyPoint from "./components/MyPoint";
import Link from "next/link";
import { getUserInfo } from "@/api/user-action";
import { ChevronRight } from "lucide-react";

const Mypage = async () => {
  const user = await getUser();
  if (!user) return;
  await getUserInfo(user.id);
  const userId = user.id;
  return (
    <div className="w-full h-full mx-auto bg-[#F4FFF4]">
      <div className="flex flex-col gap-[10px] w-[1200px] mx-auto bg-[#F4FFF4]">
        <h1 className="w-[130px] h-[18px] font-wanted text-[26px] font-[700] leading-[36.4px] tracking-[-0.26px] mt-[52px] mb-[60px]">
          마이페이지
        </h1>
        <div className="flex flex-row justify-center gap-5 mb-9">
          <UserInfoCard user={user} />
          <MyPoint user={user} />
        </div>

        <Link
          href={"/mypage/challenge"}
          className="border-b-[#DCECDC] bg-[#F4FFF4] w-full h-[92px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
        >
          <p className="text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]">
            챌린지 히스토리
          </p>
          <ChevronRight />
        </Link>

        <Link
          href={"/calculator/result"}
          className="border-b-[#DCECDC] bg-[#F4FFF4] w-full h-[92px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
        >
          <p className="text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]">
            탄소계산 히스토리
          </p>
          <ChevronRight />
        </Link>
        <Link
          href={"/mypage/like/free"}
          className="border-b-[#DCECDC] bg-[#F4FFF4] w-full h-[92px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
        >
          <p className="text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]">
            나의 스크랩
          </p>
          <ChevronRight />
        </Link>
        <Link
          href={"/mypage/post/free"}
          className="border-b-[#DCECDC] bg-[#F4FFF4] w-full h-[92px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center"
        >
          <p className="text-[#000301] font-wanted text-[18px] font-[500] leading-normal tracking-[-0.18px]">
            나의 게시글
          </p>
          <ChevronRight />
        </Link>
        <div className="border-b-[#DCECDC] bg-[#F4FFF4] w-full h-[92px] p-[39px_40px] border-b border-gray-400 flex justify-between items-center">
          <DeleteAccountButton userId={userId} />
          <ChevronRight />
        </div>

        <div className="mb-[154px]">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
