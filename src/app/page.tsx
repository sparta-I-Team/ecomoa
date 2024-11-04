import { getSession } from "@/api/auth-actions";
import { getUserInfo } from "@/api/user-action";
import NicknameModal from "./(auth)/login/components/NicknameModal";

export default async function Home() {
  const session = await getSession();
  if (!session) return;
  const userInfo = await getUserInfo(session?.user.id);
  if (!userInfo.params || Object.keys(userInfo.params).length === 0) {
    return <NicknameModal />;
  }
  return <>Home</>;
}
