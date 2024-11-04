import { InputFieldProps } from "@/types/calculate";
import React from "react";
import { useFormContext } from "react-hook-form";

const InputFieldCar: React.FC<InputFieldProps> = ({
  id,
  label,
  register,
  errors,
  requiredMessage,
  placeholder,
  unit
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        {/* 자가용일 때만 라디오 버튼 표시 */}
        <label>
          <input
            type="radio"
            value="gasoline"
            {...register("fuelType", { required: requiredMessage })}
          />
          휘발유
        </label>
        <label>
          <input
            type="radio"
            value="diesel"
            {...register("fuelType", { required: requiredMessage })}
          />
          경유
        </label>
        <label>
          <input
            type="radio"
            value="lpg"
            {...register("fuelType", { required: requiredMessage })}
          />
          LGP
        </label>
        <label>
          <input
            type="radio"
            value="none"
            {...register("fuelType", { required: requiredMessage })}
          />
          자가용 없음
        </label>
        <input
          id={id}
          type="number"
          placeholder={placeholder}
          {...register(id, {
            required: requiredMessage
          })}
        />
      </div>

      <div>{unit}</div>
      <div className="h-[30px]">
        {errors[id] && (
          <small className="text-red-500">
            {errors[id] && <small role="alert">{errors[id].message}</small>}
          </small>
        )}
      </div>
      {/* 자가용일 때 차량 크기 에러 메시지 추가 */}
      {id === "car" && errors.fuelType && errors[id] && (
        <small className="text-red-500">
          <small role="alert">{errors.fuelType.message}</small>
        </small>
      )}
    </div>
  );
};

export default InputFieldCar;
