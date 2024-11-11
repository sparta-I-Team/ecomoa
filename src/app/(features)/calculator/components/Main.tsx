import Image from "next/image";
import Link from "next/link";
import React from "react";

const Main = () => {
  return (
    <div className="bg-[#F2F9F2] min-h-screen">
      <div className="w-[1200px] mx-auto">
        <div>
          <div className="mb-[100px] pt-[76px]">
            <div className="flex flex-col gap-[40px]">
              <p className=" text-[20px] font-normal text-[#00691E]">
                매월 발생하는 이산화탄소 발생량을 계산해 평소 나의 에너지
                사용량을 비교 & 분석할 수 있어요
              </p>
              <p className="text-black text-[40px] font-bold">
                이번 달 탄소 배출량을 계산해보고,
              </p>
              <p className="text-black text-[40px] font-bold">
                탄소 절감에 함께 노력해봐요
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            {/* 탄소 계산하기 버튼 영역 */}
            <div className="flex flex-row w-full h-[268px] bg-white rounded-2xl border border-[#dcecdc] justify-between">
              <div className=" mt-[60px] ml-[60px]">
                <div className=" mb-[53px]">
                  <div className="text-[32px] font-semibold mb-[24px]">
                    탄소 배출량 계산하기
                  </div>

                  <div className="text-[20px]">
                    전기 / 수도 / 가스 / 교통 / 폐기물에 대한 사용량을
                    입력하세요
                  </div>
                </div>
                {/* 버튼 */}
                <div className="w-[208px] h-[56px] px-8 bg-[#0d9c36] rounded-[85px] text-[white] text-[20px] font-semibold hover:bg-[#00320F]">
                  <Link href="/calculator/calculate">
                    <div className="flex flex-col h-full justify-center items-center whitespace-nowrap">
                      탄소 계산하기
                    </div>
                  </Link>
                </div>
              </div>
              <Image
                src={"/calculate/calculate_btn_img.svg"}
                alt={"tree-image"}
                width={344}
                height={268}
              />
            </div>

            {/* 히스토리 버튼 영역 */}
            <div className="flex flex-row w-full h-[268px] bg-white rounded-2xl border border-[#dcecdc] justify-between">
              <div className=" mt-[60px] ml-[60px]">
                <div className=" mb-[53px]">
                  <div className="text-[32px] font-semibold mb-[24px]">
                    나의 탄소 배출량 히스토리
                  </div>

                  <div className="text-[20px]">
                    이전에 계산한 탄소 배출량에 대한 종합적인 통계를 확인하세요
                  </div>
                </div>
                <div className="w-[208px] h-[56px] px-8 bg-[#0d9c36] rounded-[85px] text-[white] text-[20px] font-semibold hover:bg-[#00320F]">
                  <Link href="/calculator/result-history-main">
                    {/* whitespace-nowrap 속성 추가했음 */}
                    <div className="flex flex-col h-full justify-center items-center whitespace-nowrap">
                      히스토리 확인하기
                    </div>
                  </Link>
                </div>
              </div>
              <Image
                src={"/calculate/calculate_history_btn_img.svg"}
                alt={"tree-image"}
                width={344}
                height={268}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
