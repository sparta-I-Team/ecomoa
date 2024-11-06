import React from "react";
import UsageCard from "./UsageCard";

export interface SectionCardProps {
  logo: string;
  title: string;
  usageValue: number | undefined;
  co2Value: number | undefined;
}

const SectionCard: React.FC<SectionCardProps> = ({
  logo,
  title,
  usageValue,
  co2Value
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
          />
        </div>
      </div>
    </>
  );
};

export default SectionCard;
