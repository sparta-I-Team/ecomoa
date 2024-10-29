"use client";
import { getMyPosts } from "@/api/user-action";
import { MyPosts } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";

const Myposts = () => {
  const { user } = userStore();
  console.log("주스탠드 user======================>", user);
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
    <div>
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
        <p>작성한 게시글이 없습니다.</p>
      )}
    </div>
  );
};
export default Myposts;
