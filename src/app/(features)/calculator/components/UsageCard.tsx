import Image from "next/image";
import React from "react";
import { SectionCardProps } from "./SectionCard";

const UsageCard: React.FC<SectionCardProps> = ({
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
      <div className="w-[320px] h-[200px] md:w-[585px] md:h-[240px] p-[18px] bg-white rounded-2xl border border-[#edeef0] flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="flex flex-col justify-between gap-5 h-44">
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px]">
                  <Image src={logo} alt={logo} width={36} height={36} />
                </div>
                <div className="text-[#000301] text-[16px] md:text-[21px] font-semibold">
                  {title}
                </div>
              </div>
              <div className="text-[12px] md:text-[14px]">
                {isHighest && (
                  <div className="h-8 px-4 py-2.5 rounded-[32px] border border-[#525660] items-center gap-2.5">
                    가장 많은 배출량
                  </div>
                )}
                {isLowest && (
                  <div className="h-8 px-4 py-2.5 rounded-[32px] border border-[#525660] items-center gap-2.5">
                    가장 적은 배출량
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="self-stretch justify-center items-center gap-4 inline-flex">
            <div className="self-stretch justify-center items-center gap-4 inline-flex">
              <div className="w-[132px] h-[100px] md:w-[254px] md:h-[120px] bg-[#f5f7f7] rounded-xl flex-col justify-center items-center gap-5 inline-flex">
                <div className="text-center text-[#000301] text-[12px] mb:text-[16px] font-semibold">
                  에너지 사용량
                </div>
                <div className="self-stretch flex justify-center items-end gap-1">
                  <div className="text-[#32343a] text-[20px] md:text-[34px] font-semibold">
                    {usageValue ?? 0}
                  </div>
                  <div className="text-[#32343a] text-[12px] md:text-[22px] font-semibold">
                    {unit}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[132px] h-[100px] md:w-[254px] md:h-[120px] bg-[#cbf5cb] rounded-xl flex-col justify-center items-center gap-5 inline-flex">
              <div className="self-stretch text-center text-[#000301] text-[12px] mb:text-[16px] font-semibold">
                Co2 배출량
              </div>
              <div className="self-stretch justify-center items-end gap-1 inline-flex">
                <div className="text-[#0d9c36] text-[20px] md:text-[34px] font-semibold">
                  {co2Value ?? 0}
                </div>
                <div className="text-[#0d9c36] text-[12px] md:text-[22px] font-semibold">
                  kg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsageCard;
