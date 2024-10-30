import { getUser } from "@/api/auth-actions";
import { getBookmarks } from "@/api/user-action";

const BookmarkPage = async () => {
  const user = await getUser();
  if (!user) return;
  const myBookmarks = await getBookmarks(user.id);
  return (
    <>
      {myBookmarks && myBookmarks.length > 0 ? (
        <div className="bg-gray-400 flex flex-col items-center">
          {myBookmarks.map((data) => (
            <div key={data.bookmark_id}>
              <p>bookmark_id: {data.bookmark_id}</p>
              <p>post_title: {data.posts.post_title}</p>
              <p>post_content: {data.posts.post_content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>스크랩한 게시글이 없습니다.</div>
      )}
    </>
  );
};

export default BookmarkPage;
