import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="mt-[76px] mb-[120px]">
        <p className="text-[16px]"> &lt; 탄소 계산기 홈</p>
        <div className="w-full h-[1px] bg-gray-300 my-4 mb-[36px]"></div>{" "}
        <p className="text-[#32343a] text-[30px] font-semibold mb-[28px]">
          탄소 배출량 계산하기
        </p>
        <p className=" text-[20px] font-normal text-[#00691E]">
          이번 달 이산화탄소 배출량이 얼마나 발생했을지 계산해봅시다
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-[80px]">
          <Image
            src="/calculate/Frame 2085667172.svg"
            alt="Loading-character"
            width={360}
            height={360}
          />
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-center text-black text-[32px] font-semibold ">
            이번 달 탄소 배출량을 계산 중 입니다
          </p>
          <p className="text-center text-black text-[32px] font-semibold ">
            잠시만 기다려 주세요
          </p>
        </div>
      </div>
    </>
  );
};

export default Loading;
