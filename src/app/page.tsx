import { getUser } from "@/api/auth-actions";
import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import NicknameModal from "./(auth)/login/components/NicknameModal";

export default async function Home() {
  // 여기서 로그인 한 회원의 params를 체크한 후에 ,
  // params의 값이 false 이면 모달 띄워라
  const user = await getUser();
  if (!user) return;
  const userInfo: UserInfo = await getUserInfo(user?.id);
  if (userInfo?.params?.firstTag === false) {
    return <NicknameModal />;
  }
  // 여기는 서버 서버 컴포넌트여야 하는거 아닌가요?
  // 서버 컴포넌트 supabase client를 불러와서 , 해당 로그인 한 유저의 정보를 불러오면
  // 값을 비교할 로직을 만든 후 불러온 정보를 로직에 태우면 끝?
  // ture, false인지만 구분해서 , 모달 컴포넌트를 불러올지 판단
  // 그후에 모달에서 작성 후 업데이트를 해줘야 함.

  return <>Home</>;
}
