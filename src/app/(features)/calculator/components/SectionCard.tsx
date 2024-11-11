import React from "react";
import UsageCard from "./UsageCard";

export interface SectionCardProps {
  logo: string;
  title: string;
  usageValue: number | undefined;
  co2Value: number | undefined;
  unit: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  logo,
  title,
  usageValue,
  co2Value,
  unit
}) => {
  return (
    <>
      <div className="flex flex-col mb-[20px]">
        <div className="flex flex-row justify-between">
          <UsageCard
            logo={logo}
            title={title}
            usageValue={usageValue}
            co2Value={co2Value}
            unit={unit}
          />
        </div>
      </div>
    </>
  );
};

export default SectionCard;
