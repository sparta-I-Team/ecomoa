import React from "react";
import UsageCard from "./UsageCard";

export interface SectionCardProps {
  title: string;
  usageValue: number | undefined;
  co2Value: number | undefined;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  usageValue,
  co2Value
}) => {
  return (
    <div className="flex flex-col mb-[20px]">
      <div>{title}</div>
      <div className="w-[1200px] border border-[#5bca11] mt-[12px] mb-[20px]"></div>
      <div className="flex flex-row justify-between">
        <UsageCard usageLabel="사용량" usageValue={usageValue} co2Card={true} />
        <UsageCard
          usageLabel="Co2 배출량"
          usageValue={co2Value}
          co2Card={false}
        />
      </div>
    </div>
  );
};

export default SectionCard;
