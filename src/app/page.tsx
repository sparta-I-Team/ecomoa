import Service from "@/components/layout/Service";
import NicknameManager from "./(auth)/login/components/NicknameManager";

export default function Home() {
  return (
    <>
      <Service />
      <NicknameManager />
    </>
  );
}
