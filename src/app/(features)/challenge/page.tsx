import { Modal } from "@/components/shared/Modal";
import { Challenge } from "./components/Challenge";

export default function Page() {
  return (
    <main className="h-full min-h-screen bg-white">
      <Challenge />
      <Modal />
    </main>
  );
}
