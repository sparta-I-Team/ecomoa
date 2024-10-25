import { FieldErrors, UseFormRegister } from "react-hook-form";

// FormData type 정리
export interface FormData {
  electric: number;
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
}
