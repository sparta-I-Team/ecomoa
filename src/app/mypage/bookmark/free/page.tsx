import { getUser } from "@/api/auth-actions";
import MyScrap from "../../components/MyScrap";

const FreeBookmarkPage = async () => {
  const user = await getUser();
  if (!user) return;
  return (
    <>
      <div className="w-full bg-[#F4FFF4] ">
        <div className="w-[1200px] mx-auto">
          <MyScrap type="free" />
        </div>
      </div>
    </>
  );
};

export default FreeBookmarkPage;
