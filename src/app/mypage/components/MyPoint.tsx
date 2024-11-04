import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { User } from "@supabase/supabase-js";

interface MyPointProps {
  user: User;
}

const MyPoint = async ({ user }: MyPointProps) => {
  const userInfo: UserInfo | null = await getUserInfo(user.id);
  return (
    <div className="w-[586px] h-[220px] px-8 bg-[#edeef0]">
      <div className="flex flex-col gap-6">
        <p className="mt-8">내 포인트</p>
        <p className="font-semibold text-[32px] mb-[42px]">
          {userInfo?.user_point}P
        </p>
      </div>
      <div className="flex justify-center">
        <button className="border-none w-1/2">포인트 적립, 사용내역</button>
        <button className="border-none w-1/2">포인트 교환 샵</button>
      </div>
    </div>
  );
};

export default MyPoint;
