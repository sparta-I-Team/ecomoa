import Myposts from "../../components/Myposts";

const FreePostPage = async () => {
  return (
    <div className="w-full h-auto bg-[#E8F3E8] ">
      <div className="w-full md:w-[1200px] mx-auto">
        <Myposts type="free" />
      </div>
    </div>
  );
};

export default FreePostPage;
