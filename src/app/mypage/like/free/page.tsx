import MyLike from "../../components/LikePosts";

const FreeLikePage = async () => {
  return (
    <div className="w-full h-auto bg-[#E8F3E8] mx-auto">
      <div className="w-full">
        <MyLike type="free" />
      </div>
    </div>
  );
};

export default FreeLikePage;
