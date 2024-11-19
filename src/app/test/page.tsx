"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [point, setPoint] = useState<number>(0);
  const [prevPoint, setPrevPoint] = useState<number>(0);

  useEffect(() => {
    const levels = [1000, 2000, 3000, 4000];
    const currentLevel = levels.findIndex(
      (level) => prevPoint < level && point >= level
    );

    if (currentLevel !== -1) {
      alert("레벨이 증가했다!");
      console.log("레벨이 증가한 시점");
    }
  }, [point, prevPoint]);

  const handleIncreasePoint = () => {
    setPrevPoint(point);
    setPoint((prev) => prev + 100);
  };

  return (
    <div>
      <p>현재: {point}</p>
      <p>이전: {prevPoint}</p>
      <button onClick={handleIncreasePoint}>100 증가</button>
    </div>
  );
};

export default Page;
