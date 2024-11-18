"use client";
import MyChallenge from "../components/MyChallenge";
import ReturnMypage from "../components/ReturnMypage";

const MyChallengePage = () => {
  return (
    <div className=" bg-[#E8F3E8]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-[36px] md:mb-[48px] px-[16px] md:px-0]">
          <ReturnMypage />
        </div>
        {/* 
        <Link href={"/mypage"} className="border-b-slate-500 w-[1200]">
          <div className="flex items-center mb-[20px] pt-[62.5px]">
            <ChevronLeft />
            <span className="font-wanted text-[16px] font-[600] ">
              마이페이지
            </span>
          </div>
        </Link> */}
        <div className="mb-[101px]">
          <MyChallenge />
        </div>
      </div>
    </div>
  );
};

export default MyChallengePage;
