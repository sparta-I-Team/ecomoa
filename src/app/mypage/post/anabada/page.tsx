import Myposts from "../../components/Myposts";

const AnabadaPostPage = async () => {
  return (
    <div className="w-full bg-[#F4FFF4] ">
      <div className="w-[1200px] mx-auto">
        <Myposts type="anabada" />
      </div>
    </div>
  );
};

export default AnabadaPostPage;
