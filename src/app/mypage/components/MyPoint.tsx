import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { User } from "@supabase/supabase-js";

interface MyPointProps {
  user: User;
}

const MyPoint = async ({ user }: MyPointProps) => {
  const userInfo: UserInfo | null = await getUserInfo(user.id);
  return (
    // <section className="flex flex-col items-center "></section>
    <div className="w-[586px] h-[220px] px-8 border border-[#DCECDC] rounded-[16px] bg-[#FFF]">
      <div className="flex flex-col gap-6">
        <p className="font-wanted mt-[28px] text-[#0D9C36] text-[16px] font-[600] leading-[-0.48px]">
          내 포인트
        </p>
        <p className="font-wanted text-[28px] text-[#000301] font-[600] leading-[-0.84px]">
          {userInfo?.user_point}P
        </p>
      </div>
      <div className="flex justify-center gap-3 mt-[15px]">
        <button className="flex flex-col justify-center items-center text-[#FFFFFF] font-wanted text-[18px] font-[500] leading-[0-18px] border-none w-[255px] h-[60px] p-[24px_16px] bg-[#00320F] rounded-[40px]">
          포인트 적립, 사용내역
        </button>
        <button className="flex flex-col justify-center items-center text-[#FFFFFF] font-wanted text-[18px] font-[500] leading-[0-18px] border-none w-[255px] h-[60px] p-[24px_16px] bg-[#00320F] rounded-[40px]">
          포인트 교환 샵
        </button>
      </div>
    </div>
  );
};

export default MyPoint;
