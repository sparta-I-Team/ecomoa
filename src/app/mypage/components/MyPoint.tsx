import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { User } from "@supabase/supabase-js";

interface MyPointProps {
  user: User;
}

const MyPoint = async ({ user }: MyPointProps) => {
  const userInfo: UserInfo | null = await getUserInfo(user.id);
  return (
    <div className="w-[586px] h-[220px] flex flex-col justify-start gap-3 p-5 bg-[#edeef0]">
      <p className="mt-4">내 포인트</p>
      <p className="font-semibold text-[32px]">{userInfo?.user_point}P</p>
    </div>
  );
};

export default MyPoint;
