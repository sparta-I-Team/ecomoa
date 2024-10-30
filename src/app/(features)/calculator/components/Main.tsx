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
        <div>
          <div className="w-[789px] h-[458px] bg-red-300"></div>
        </div>
        <Link href="/calculator/calculate">
          <button>탄소 배출량 계산하기</button>
        </Link>
        <Link href="/calculator/result">
          <button>이전 탄소 배출 통계</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
