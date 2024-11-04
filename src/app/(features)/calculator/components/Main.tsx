import Link from "next/link";
import React from "react";

const Main = () => {
  return (
    <div>
      <div>
        <h1>이번 달 탄소 배출량을 계산해보고, 탄소 절감에 함께 노력해봐요</h1>
        <p>
          매월 발생하는 이산화탄소 발생량을 계산해 평소 나의 에너지 사용량을
          비교 & 분석할 수 있어요
        </p>
      </div>
      <div>
        <Link href="/calculator/calculate">
          <div className="w-full h-[250px] bg-[#EAFCDE] mb-[20px]">
            <div>탄소 배출량 계산하기</div>
            <div>
              전기 / 수도 / 가스 / 교통 / 폐기물에 대한 사용량을 입력하세요
            </div>
          </div>
        </Link>
        <Link href="/calculator/result">
          <div className="w-full h-[250px] bg-[#EAFCDE]">
            <div>이전 탄소 배출량 히스토리</div>
            <div>
              이전에 계산한 탄소 배출량에 대한 종합적인 통계를 확인하세요{" "}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Main;
