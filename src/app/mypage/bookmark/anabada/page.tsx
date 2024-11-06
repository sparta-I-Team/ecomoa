import { getUser } from "@/api/auth-actions";
import MyScrap from "../../components/MyScrap";

const AnabadaBookmarkPage = async () => {
  const user = await getUser();
  if (!user) return;
  return (
    <>
      <div className="w-full bg-[#F4FFF4] ">
        <div className="w-[1200px] mx-auto">
          <MyScrap />
        </div>
      </div>
    </>
  );
};

export default AnabadaBookmarkPage;
