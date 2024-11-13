import React from "react";
import UsageCard from "./UsageCard";

export interface SectionCardProps {
  logo: string;
  title: string;
  usageValue: number | undefined;
  co2Value: number | undefined;
  unit: string;
  isHighest: boolean;
  isLowest: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  logo,
  title,
  usageValue,
  co2Value,
  unit,
  isHighest,
  isLowest
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
            isHighest={isHighest}
            isLowest={isLowest}
          />
        </div>
      </div>
    </>
  );
};

export default SectionCard;
