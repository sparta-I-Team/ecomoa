import { getUser } from "@/api/auth-actions";
import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import NicknameModal from "./(auth)/login/components/NicknameModal";

export default async function Home() {
  const user = await getUser();
  // console.log("@@@@@@@!!!!!!!!!!!!!", user);
  if (!user) return;
  const userInfo: UserInfo = await getUserInfo(user?.id);
  if (userInfo?.params?.firstTag === false) {
    return <NicknameModal />;
  }

  return <>Home</>;
}
