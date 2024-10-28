import React from "react";

const ChallengeHeader = () => (
  <header className="flex flex-row justify-between">
    <section className="flex flex-col justify-end">
      <article>
        <h2>안녕하세요 OO님</h2>
        <p>오늘 탄소 10000을 감소하고</p>
        <p>포인트 800P를 모았어요</p>
      </article>
      <figure className="flex flex-row items-center w-[200px] h-[100px] border">
        <div className="flex flex-row pr-2">
          <button>{`<`}</button>
          <p>11월</p>
          <button>{`>`}</button>
        </div>
        <div className="pl-2 border-l">
          <p>탄소 감량 10000</p>
          <p>포인트 수집 800</p>
          <p>챌린지 참여 100</p>
        </div>
      </figure>
    </section>

    <section className="">
      <figure className="w-[300px] h-[300px] border">
        {/* 캐릭터 및 레벨 기능 */}
      </figure>
      <div className="flex flex-row space-x-4 items-center">
        <button>레벨2{`>`}</button>
        <div className="w-[200px] h-6 border bg-gray-200 rounded">
          <div className="w-[56%] h-full bg-black rounded"></div>
        </div>
        <p>56%</p>
      </div>
    </section>
  </header>
);

export default ChallengeHeader;
