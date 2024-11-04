import { useLike } from "@/hooks/useLike";

interface Props {
  postId: string;
}

const Like = ({ postId }: Props) => {
  const { isLiked, handleToggleLike } = useLike(postId);

  return (
    <button onClick={() => handleToggleLike()}>{isLiked ? "❤️" : "♡"}</button>
  );
};

export default Like;
