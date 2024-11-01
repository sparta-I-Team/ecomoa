"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../components/InputField";
import { FormData } from "@/types/calculate";
import YearMonthPicker from "../components/YearMonthPicker";
import Loading from "../components/Loading";
import browserClient from "@/utlis/supabase/browserClient";
import { useRouter } from "next/navigation";
import { userStore } from "@/zustand/userStore";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thisYear, setThisYear] = useState<number | null>(currentYear);
  const [thisMonth, setThisMonth] = useState<number | null>(currentMonth);

  const router = useRouter();
  const { user } = userStore();
  console.log(user.id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  if (isLoading) {
    return <Loading />;
  }

  // 제출 버튼 submit
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const electricity = Number(data.electricity) || 0;
    const water = Number(data.water) || 0;
    const gas = Number(data.gas) || 0;
    const car = Number(data.car) || 0;
    const waste = Number(data.waste) || 0;

    // 토탈
    const total =
      electricity * 0.4781 +
      water * 0.237 +
      gas * 2.176 +
      (car / 16.04) * 2.097 +
      waste * 0.5573;

    setIsLoading(true);

    try {
      const { error } = await browserClient.from("carbon_records").insert({
        user_id: user.id,
        electricity_usage: electricity,
        electricity_co2: (electricity * 0.4781).toFixed(2),
        water_usage: water,
        water_co2: (water * 0.237).toFixed(2),
        gas_usage: gas,
        gas_co2: (gas * 2.176).toFixed(2),
        car_usage: car,
        car_co2: ((car / 16.04) * 2.097).toFixed(2),
        waste_volume: waste,
        waste_co2: (waste * 0.5573).toFixed(2),
        carbon_emissions: total.toFixed(2),
        year: Number(thisYear),
        month: Number(thisMonth)
      });
      if (error) {
        console.error("데이터 삽입 오류:", error);
        alert("데이터 삽입 중 오류가 발생했습니다.");
      } else {
        setTimeout(() => {
          alert(
            `전체 에너지원 CO₂ 발생 합계 : ${total.toFixed(
              2
            )} kg/월 ${thisYear}년도 ${thisMonth}달`
          );
          setIsLoading(false);
          router.push("/calculator/result");
        }, 5000);
      }
    } catch (err) {
      console.error("에러 발생:", err);
      alert("데이터 처리 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const handleYearChange = (year: number) => {
    setThisYear(year);
  };

  const handleMonthChange = (month: number) => {
    setThisMonth(month);
  };

  const handleCloseDropdown = () => {
    // 드롭다운이 닫힐 때 데이터를 새로 로드합니다
    setThisYear(thisYear);
    setThisMonth(thisMonth);
  };

  return (
    <>
      <div>탄소 배출량 계산하기</div>
      <div>이번 달 이산화탄소 배출량이 얼마나 발생했을지 계산해봅시다</div>
      <div className="flex">
        <YearMonthPicker
          thisYear={thisYear}
          thisMonth={thisMonth}
          onChangeYear={handleYearChange} // 연도 변경 핸들러 전달
          onChangeMonth={handleMonthChange} // 월 변경 핸들러 전달
          onCloseDropdown={handleCloseDropdown} // 드롭다운 닫힘 시 호출될 함수
          disabled={false}
        />
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="electricity"
          label="전기"
          register={register}
          errors={errors}
          requiredMessage="사용한 전기량을 입력해주세요"
          placeholder="에너지 사용량을 입력해주세요(숫자)"
          unit="kwh/월"
        />

        <InputField
          id="water"
          label="수도"
          register={register}
          errors={errors}
          requiredMessage="사용한 수도량을 입력해주세요"
          placeholder="에너지 사용량을 입력해주세요(숫자)"
          unit="m³/월"
        />
        <InputField
          id="gas"
          label="가스"
          register={register}
          errors={errors}
          requiredMessage="사용한 가스량을 입력해주세요"
          placeholder="에너지 사용량을 입력해주세요(숫자)"
          unit="m³/월"
        />
        <InputField
          id="car"
          label="자가용"
          register={register}
          errors={errors}
          requiredMessage="자가용 사용량을 입력해주세요"
          placeholder="에너지 사용량을 입력해주세요(숫자)"
          unit="km/월"
        />
        <InputField
          id="waste"
          label="폐기물"
          register={register}
          errors={errors}
          requiredMessage="폐기물량을 입력해주세요"
          placeholder="에너지 사용량을 입력해주세요(숫자)"
          unit="Kg/월"
        />
        <button type="submit">계산하기</button>
      </form>
    </>
  );
};
export default Page;
