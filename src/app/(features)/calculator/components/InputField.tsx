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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        {...register(id, {
          required: requiredMessage
        })}
      />
      <div>{unit}</div>
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
