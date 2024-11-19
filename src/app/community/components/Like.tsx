import { useLike } from "@/hooks/useLike";
import Image from "next/image";

interface Props {
  postId: string;
}

const Like = ({ postId }: Props) => {
  const { isLiked, handleToggleLike } = useLike(postId);
  return (
    <div className="flex items-center space-x-2">
      <button
        className="border-none font-bold text-[20px] p-0"
        onClick={(e) => {
          e.preventDefault();
          handleToggleLike(); // 좋아요 토글 함수 호출
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
    </div>
  );
};

export default Like;
