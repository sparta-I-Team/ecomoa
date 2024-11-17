// app/page.tsx
import { Modal } from "@/components/shared/Modal";
import { Challenge } from "./components/Challenge";

// 서버 컴포넌트
export default function Page() {
  return (
    <main className="h-full min-h-screen bg-white">
      <Challenge />
      <Modal />
    </main>
  );
}
