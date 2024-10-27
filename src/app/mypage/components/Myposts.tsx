"use client";
import { getMyPosts } from "@/api/user-action";
import { MyPosts, ProfileProps } from "@/types/userInfoType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Myposts = ({ user }: ProfileProps) => {
  const [showPosts, setShowPosts] = useState(false);
  const { data: myPosts, isLoading } = useQuery<MyPosts[] | null>({
    queryKey: ["myPosts", user.id],
    queryFn: () => getMyPosts(user.id),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });

  const handleShowPosts = () => {
    setShowPosts((prev) => !prev);
  };
  if (isLoading) {
    <div>
      <p>Loading...</p>
    </div>;
  }
  return (
    <div className="bg-gray-400 flex flex-col items-center mt-4">
      {myPosts && myPosts.length > 0 ? (
        <>
          <button onClick={handleShowPosts}>
            {showPosts ? "숨기기" : "내가 쓴 글 확인하기"}
          </button>
          {showPosts && (
            <div>
              {myPosts.map((post) => (
                <>
                  <p>{post.post_title}</p>
                  <p>{post.post_content}</p>
                </>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default Myposts;
