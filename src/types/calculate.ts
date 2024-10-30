import { UUID } from "crypto";
import { FieldErrors, UseFormRegister } from "react-hook-form";

// FormData type 정리
export interface FormData {
  electricity: number;
  water: number;
  gas: number;
  car: number;
  waste: number;
}

// InputFieldProps type 정리
export interface InputFieldProps {
  id: keyof FormData;
  label: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  requiredMessage?: string;
  placeholder?: string;
  unit: string;
}

// 이번달 내 사용량
export interface currentMonthly {
  user_id: UUID;
  electricity_usage: number;
  electricity_co2: number;
  water_usage: number;
  water_co2: number;
  gas_usage: number;
  gas_co2: number;
  car_usage: number;
  car_co2: number;
  waste_volume: number;
  waste_co2: number;
  carbon_emissions: number;
}

// 이번달 내 사용량 차트용
export interface MonthlyChartProps {
  currentMonthly?: MonthlyData | null;
}

// 이번달 유저 전체 사용량
export interface totalCurrentMonthly {
  // user_id: UUID;
  electricity_usage: number;
  electricity_co2: number;
  water_usage: number;
  water_co2: number;
  gas_usage: number;
  gas_co2: number;
  car_usage: number;
  car_co2: number;
  waste_volume: number;
  waste_co2: number;
  carbon_emissions: number;
}

//
export interface MonthlyData {
  electricity_usage: number;
  electricity_co2: number;
  water_usage: number;
  water_co2: number;
  gas_usage: number;
  gas_co2: number;
  car_usage: number;
  car_co2: number;
  waste_volume: number;
  waste_co2: number;
  carbon_emissions: number;
}

export interface ThisMonthChartProps {
  currentMonthly: MonthlyData | null;
  totalCurrentMonthly?: MonthlyData | null;
}
