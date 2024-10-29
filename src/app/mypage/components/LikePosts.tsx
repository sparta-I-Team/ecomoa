import { getLikePosts } from "@/api/user-action";
import { User } from "@supabase/supabase-js";

interface LikePostsProps {
  user: User;
}

const LikePosts = async ({ user }: LikePostsProps) => {
  const likeInfo = await getLikePosts(user.id);
  const posts = likeInfo?.map((like) => like.posts).flat(); // 모든 like에서 posts 추출 후 평탄화
  return (
    <div className="bg-slate-400">
      {posts?.map((post) => (
        <div key={post.post_id}>
          <p>title: {post.post_title}</p>
        </div>
      ))}
    </div>
  );
};

export default LikePosts;
