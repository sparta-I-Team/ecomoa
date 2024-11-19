import { useLike } from "@/hooks/useLike";
import Image from "next/image";

interface Props {
  postId: string;
}

const Like = ({ postId }: Props) => {
  const { isLiked, handleToggleLike } = useLike(postId);

  return (
    <button
      className="border-none font-bold text-[20px] p-0"
      onClick={(e) => {
        e.preventDefault();
        handleToggleLike();
      }}
    >
      <Image
        src={
          isLiked ? "/community/heart_full.png" : "/community/heart_line.png"
        }
        alt={isLiked ? "Liked" : "Not Liked"}
        width={14}
        height={14}
      />
    </button>
  );
};

export default Like;
