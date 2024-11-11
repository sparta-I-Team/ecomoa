import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { User } from "@supabase/supabase-js";
import PointShopModal from "./PointShopModal";
import { Modal } from "@/components/shared/Modal";

interface MyPointProps {
  user: User;
}

const MyPoint = async ({ user }: MyPointProps) => {
  const userInfo: UserInfo | null = await getUserInfo(user.id);
  return (
    <div className="w-[586px] h-[220px] px-8 border border-[#DCECDC] rounded-[16px] bg-[#FFF]">
      <div className="flex flex-col gap-6">
        <p className="font-wanted mt-[28px] text-[#0D9C36] text-[16px] font-[600] leading-[-0.48px]">
          내 포인트
        </p>
        <p className="font-wanted text-[28px] text-[#000301] font-[600] leading-[-0.84px]">
          {userInfo?.user_point}P
        </p>
      </div>
      <div className="flex justify-center gap-3 mt-[60px]">
        <PointShopModal />
        <Modal />
      </div>
    </div>
  );
};

export default MyPoint;
