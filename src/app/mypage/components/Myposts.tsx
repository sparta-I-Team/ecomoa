"use client";
import { getMyPosts } from "@/api/user-action";
import { MyPosts, ProfileProps } from "@/types/userInfoType";
import { useQuery } from "@tanstack/react-query";

const Myposts = ({ user }: ProfileProps) => {
  const { data: myPosts, isLoading } = useQuery<MyPosts[] | null>({
    queryKey: ["myPosts", user.id],
    queryFn: () => getMyPosts(user.id),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-400 flex flex-col items-center mt-4">
      {myPosts && myPosts.length > 0 ? ( // myPosts가 null이 아닐 경우 확인
        <div>
          {myPosts.map((post) => (
            <div key={post.post_id}>
              <p>user_id: {post.user_id}</p>
              <p>title: {post.post_title}</p>
              <p>content: {post.post_content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};
export default Myposts;
