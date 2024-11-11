import React from "react";

const FuelTypeSelector: React.FC<{
  selectedFuelType: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ selectedFuelType, onChange }) => {
  return (
    <div>
      <div className="flex gap-[20px]">
        <label className="text-[14px]">
          <input
            type="radio"
            value="휘발유"
            checked={selectedFuelType === "휘발유"}
            onChange={onChange}
          />
          휘발유
        </label>
        <label>
          <input
            type="radio"
            value="경유"
            checked={selectedFuelType === "경유"}
            onChange={onChange}
          />
          경유
        </label>
        <label>
          <input
            type="radio"
            value="LPG"
            checked={selectedFuelType === "LPG"}
            onChange={onChange}
          />
          LPG
        </label>
        <label>
          <input
            type="radio"
            value="없음"
            checked={selectedFuelType === "없음"}
            onChange={onChange}
          />
          없음
        </label>
      </div>
    </div>
  );
};

export default FuelTypeSelector;
