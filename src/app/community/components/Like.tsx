import { useLike } from "@/hooks/useLike";

interface Props {
  postId: string;
}

const Like = ({ postId }: Props) => {
  const { isLiked, handleToggleLike } = useLike(postId);

  return (
    <button
      className="border-none font-bold text-[20px]"
      onClick={(e) => {
        e.preventDefault();
        handleToggleLike();
      }}
    >
      {isLiked ? "❤️" : "♡"}
    </button>
  );
};

export default Like;
