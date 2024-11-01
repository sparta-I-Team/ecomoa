import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { ThisMonthChartProps } from "@/types/calculate";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ThisMonthChart: React.FC<ThisMonthChartProps> = ({
  currentData,
  totalAvgData,
  lastData,
  lastTotalAvgData
}) => {
  const data = {
    labels: ["지난 달", "이번 달"],
    datasets: [
      {
        label: "평균 배출량",
        data: [
          lastTotalAvgData?.carbon_emissions || 0,
          totalAvgData?.carbon_emissions || 0
        ],
        backgroundColor: "#D9D9D9",
        borderColor: "#D9D9D9",
        borderWidth: 1
      },
      {
        label: "나의 총 배출량",
        data: [
          lastData?.carbon_emissions || 0,
          currentData?.carbon_emissions || 0
        ],
        backgroundColor: "#5BCA11",
        borderColor: "#5BCA11",
        borderWidth: 1
      }
    ]
  };
  // console.log("lastData", lastData);
  // console.log("lastTotalAvgData", lastTotalAvgData);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const // 또는 "bottom", "left", "right" 중 하나로 설정
      },
      title: {
        display: true,
        text: "이번달 탄소 배출량"
      }
    },
    layout: {
      padding: 20
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Bar
        data={data}
        options={options}
        plugins={[ChartDataLabels]} // 플러그인 등록
      />
    </div>
  );
};

export default ThisMonthChart;
