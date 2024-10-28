import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { User } from "@supabase/supabase-js";

interface MyPointProps {
  user: User;
}

const MyPoint = async ({ user }: MyPointProps) => {
  const userInfo: UserInfo = await getUserInfo(user.id);
  return (
    <div className="flex flex-col justify-start p-5 w-full bg-[#edeef0]">
      <p>내 포인트</p>
      <p className="font-black">{userInfo.user_point}P</p>
    </div>
  );
};

export default MyPoint;
