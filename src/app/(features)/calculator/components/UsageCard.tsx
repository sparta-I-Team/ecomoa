import Image from "next/image";
import React from "react";

export interface UsageCardProps {
  logo: string;
  title: string;
  usageValue: number | undefined;
  co2Value: number | undefined;
  unit: string;
}

const UsageCard: React.FC<UsageCardProps> = ({
  logo,
  title,
  usageValue,
  co2Value,
  unit
}) => {
  return (
    <>
      <div className="w-[585px] h-60 p-8 bg-white rounded-2xl border border-[#edeef0] flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="h-44 flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2 flex">
              <Image src={logo} alt={logo} width={36} height={36} />
              <div className="text-[#000301] text-[21px] font-semibold font-['Pretendard'] leading-[29.40px]">
                {title}
              </div>
            </div>
          </div>
          <div className="self-stretch justify-center items-center gap-4 inline-flex">
            <div className="self-stretch justify-center items-center gap-4 inline-flex">
              <div className="w-[254px] h-[120px] bg-[#f5f7f7] rounded-xl flex-col justify-center items-center gap-5 inline-flex">
                <div className="text-center text-[#000301] text-[16px] font-semibold">
                  에너지 사용량
                </div>
                <div className="self-stretch flex justify-center items-end gap-1">
                  <div className="text-[#32343a] text-[34px] font-semibold">
                    {usageValue ?? 0}
                  </div>
                  <div className="text-[#32343a] text-[22px] font-semibold">
                    {unit}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[254px] h-[120px] bg-[#cbf5cb] rounded-xl flex-col justify-center items-center gap-5 inline-flex">
              <div className="self-stretch text-center text-[#000301] text-[16px] font-semibold">
                Co2 배출량
              </div>
              <div className="self-stretch justify-center items-end gap-1 inline-flex">
                <div className="text-[#0d9c36] text-[34px] font-semibold">
                  {co2Value ?? 0}
                </div>
                <div className="text-[#0d9c36] text-[22px] font-semibold">
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
