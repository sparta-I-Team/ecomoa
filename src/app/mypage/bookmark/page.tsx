import { getUser } from "@/api/auth-actions";
import { getBookmarkAnabada } from "@/api/user-action";
import MyScrap from "../components/MyScrap";

const BookmarkPage = async () => {
  const user = await getUser();
  if (!user) return;
  const myBookmarks = await getBookmarkAnabada(user.id);
  console.log(myBookmarks);
  return (
    <>
      {myBookmarks && myBookmarks.length > 0 ? (
        <div className="flex flex-col items-center">
          <MyScrap />
        </div>
      ) : (
        <div>스크랩한 게시글이 없습니다.</div>
      )}
    </>
  );
};

export default BookmarkPage;
