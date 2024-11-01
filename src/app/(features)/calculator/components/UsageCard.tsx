import React from "react";

export interface UsageCardProps {
  usageLabel: string;
  usageValue: number | undefined;
  co2Card: boolean;
}

const UsageCard: React.FC<UsageCardProps> = ({
  usageLabel,
  usageValue,
  co2Card
}) => {
  return (
    <div
      className={`flex w-[578px] h-[100px] rounded-[20px] justify-center items-center gap-20 ${
        co2Card ? "bg-[#eafcde]" : "border border-[#5bca11]"
      }`}
    >
      <div>{usageLabel}</div>
      <div>{usageValue ?? 0} kg</div>
    </div>
  );
};

export default UsageCard;
