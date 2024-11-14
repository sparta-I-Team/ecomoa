import MyLike from "../../components/LikePosts";

const FreeLikePage = async () => {
  return (
    <div className="w-full h-full bg-[#E8F3E8] ">
      <div className="w-[1200px] mx-auto">
        <MyLike type="free" />
      </div>
    </div>
  );
};

export default FreeLikePage;
