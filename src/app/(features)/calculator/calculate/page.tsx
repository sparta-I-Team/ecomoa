"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../components/InputField";
import { FormData } from "@/types/calculate";
// import YearMonthPicker from "../components/YearMonthPicker";
import Loading from "../components/Loading";
import browserClient from "@/utlis/supabase/browserClient";
import { useRouter } from "next/navigation";
import { userStore } from "@/zustand/userStore";
import YearMonthPickerMain from "../components/YearMonthPickerMain";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thisYear, setThisYear] = useState<number | null>(currentYear);
  const [thisMonth, setThisMonth] = useState<number | null>(currentMonth);

  const router = useRouter();
  const { user } = userStore();

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

    const total =
      electricity * 0.4781 +
      water * 0.237 +
      gas * 2.176 +
      (car / 16.04) * 2.097 +
      waste * 0.5573;

    setIsLoading(true);

    try {
      const { data: existingData, error: fetchError } = await browserClient
        .from("carbon_records")
        .select("*")
        .eq("user_id", user.id)
        .eq("year", thisYear)
        .eq("month", thisMonth);

      if (fetchError) {
        console.error("기존 데이터 조회 오류:", fetchError);
        alert("기존 데이터 조회 중 오류가 발생했습니다.");
        setIsLoading(false);
        return;
      }

      const selectedData =
        existingData && existingData.length > 0 ? existingData[0] : null;

      if (selectedData) {
        const { error } = await browserClient
          .from("carbon_records")
          .update({
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
            carbon_emissions: total.toFixed(2)
          })
          .eq("user_id", user.id) // 사용자의 id
          .eq("year", thisYear) // 연도
          .eq("month", thisMonth); // 월

        if (error) {
          console.error("데이터 업데이트 오류:", error);
          alert("데이터 업데이트 중 오류가 발생했습니다.");
        } else {
        }
      } else {
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
        }
      }
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/calculator/result/${thisYear}/${thisMonth}`);
      }, 5000);
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

  return (
    <>
      <div className="w-[1200px] mx-auto">
        <div className="mt-[76px] mb-[120px]">
          <Link href="/calculator">
            <p className="text-[16px]"> &lt; 탄소 계산기 홈</p>
          </Link>
          <div className="w-full h-[1px] bg-gray-300 my-4 mb-[36px]"></div>
          <p className="text-[#32343a] text-[30px] font-semibold mb-[28px]">
            탄소 배출량 계산하기
          </p>
          <p className=" text-[20px] font-normal text-[#00691E]">
            이번 달 이산화탄소 배출량이 얼마나 발생했을지 계산해봅시다
          </p>
        </div>
        <div className="flex mb-10">
          <YearMonthPickerMain
            thisYear={thisYear}
            thisMonth={thisMonth}
            onChangeYear={handleYearChange} // 연도 변경 핸들러 전달
            onChangeMonth={handleMonthChange} // 월 변경 핸들러 전달
            disabled={false}
          />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-[48px] gap-[10px]">
            <InputField
              id="electricity"
              label="전기"
              register={register}
              errors={errors}
              requiredMessage="사용한 전기량을 입력해주세요"
              placeholder="에너지 사용량을 입력해주세요."
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
              requiredMessage="연료종류 선택과 사용량을 모두 입력해주세요"
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
          </div>
          <div className="flex justify-center mb-[126px]">
            <button
              type="submit"
              className="w-[380px] h-[60px] px-4 py-6 bg-[#dcecdc] rounded-[40px] justify-center items-center gap-2.5 inline-flex border-none hover:bg-[#0d9c36]"
            >
              <div className="grow shrink basis-0 text-center text-[#6e7481] text-[18px] font-semibold hover:text-white">
                계산하기
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Page;
