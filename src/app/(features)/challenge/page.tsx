// app/page.tsx
import { Challenge } from "./components/Challenge";

// 서버 컴포넌트
export default function Page() {
  return (
    <main className="pt-4">
      <Challenge />;
    </main>
  );
}
