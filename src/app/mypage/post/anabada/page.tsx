import Myposts from "../../components/Myposts";

const AnabadaPostPage = async () => {
  return (
    <div className="w-full bg-[#E8F3E8] ">
      <div className="w-[1200px] mx-auto">
        <Myposts type="anabada" />
      </div>
    </div>
  );
};

export default AnabadaPostPage;
