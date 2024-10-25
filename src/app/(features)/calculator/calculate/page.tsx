"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../components/InputField";
import { FormData } from "@/types/calculate";
import YearMonthPicker from "../components/YearMonthPicker";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const electric = Number(data.electric) || 0;
    const water = Number(data.water) || 0;
    const gas = Number(data.gas) || 0;
    const car = Number(data.car) || 0;
    const waste = Number(data.waste) || 0;

    const total =
      electric * 0.4781 +
      water * 0.237 +
      gas * 2.176 +
      (car / 16.04) * 2.097 +
      waste * 0.5573;

    alert(`전체 에너지원 CO₂ 발생 합계 : ${total.toFixed(2)} kg/월`);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("선택한 연도:", event.target.value);
  };
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("선택한 달:", event.target.value);
  };

  return (
    <>
      <div>탄소 배출량 계산하기</div>
      <div className="flex">
        <div>계산하려는 달</div>
        <YearMonthPicker
          onChangeYear={handleYearChange}
          onChangeMonth={handleMonthChange}
        />
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="electric"
          label="전기"
          register={register}
          errors={errors}
          requiredMessage="사용한 전기량을 입력해주세요"
          placeholder="이번달 사용량을 입력해주세요"
          unit="kwh/월"
        />

        <InputField
          id="water"
          label="수도"
          register={register}
          errors={errors}
          requiredMessage="사용한 수도량을 입력해주세요"
          placeholder="이번달 사용량을 입력해주세요0.00"
          unit="m³/월"
        />
        <InputField
          id="gas"
          label="가스"
          register={register}
          errors={errors}
          requiredMessage="사용한 가스량을 입력해주세요"
          placeholder="이번달 사용량을 입력해주세요"
          unit="m³/월"
        />
        <InputField
          id="car"
          label="자가용"
          register={register}
          errors={errors}
          requiredMessage="자가용 사용량을 입력해주세요"
          placeholder="이번달 사용량을 입력해주세요"
          unit="km/월"
        />
        <InputField
          id="waste"
          label="폐기물"
          register={register}
          errors={errors}
          requiredMessage="폐기물량을 입력해주세요"
          placeholder="이번달 사용량을 입력해주세요"
          unit="Kg/월"
        />
        <button type="submit">저장하고 다음</button>
      </form>
    </>
  );
};

export default Page;
