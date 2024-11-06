import { InputFieldProps } from "@/types/calculate";
import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  register,
  errors,
  requiredMessage,
  placeholder,
  unit
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-black text-[24px] font-semibold mb-[18px]"
      >
        {label}
      </label>

      <div className="relative w-full">
        <input
          className="w-full h-[52px] text-[16px] rounded-[12px] bg-[#F5F5F5] text-between pl-10 border-none"
          id={id}
          type="number"
          placeholder={placeholder}
          {...register(id, {
            required: requiredMessage
          })}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-semibold text-gray-700 pr-10 text-[16px]">
          {unit}
        </span>
      </div>

      <div className="h-[30px]">
        {errors[id] && (
          <small className="text-red-500">
            {errors[id] && <small role="alert">{errors[id].message}</small>}
          </small>
        )}
      </div>
    </div>
  );
};

export default InputField;
