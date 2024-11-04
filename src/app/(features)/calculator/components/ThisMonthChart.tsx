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
  totalAvgData
  // lastData,
  // lastTotalAvgData
}) => {
  const data = {
    labels: ["평균", "내 배출량"],
    datasets: [
      {
        label: "탄소 배출량 비교",
        data: [
          totalAvgData?.carbon_emissions || 0, // "평균" 위치 값
          currentData?.carbon_emissions || 0 // "내 배출량" 위치 값
        ],
        backgroundColor: ["#D9D9D9", "#5BCA11"],
        borderColor: ["#D9D9D9", "#5BCA11"],
        borderWidth: 1,
        borderRadius: [8, 8] // 각각의 바 위쪽 모서리 둥글게
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false // 범례 숨기기
      },
      title: {
        display: true,
        text: "이번달 탄소 배출량"
      }
    },
    layout: {
      padding: 20
    },
    scales: {
      y: {
        display: false, // y축 숨기기
        grid: {
          display: false // y축의 격자선 숨기기
        }
      },
      x: {
        display: true,
        grid: {
          display: false // x축의 격자선 숨기기
        },
        ticks: {
          font: {
            size: 14
          }
        }
      }
    },
    barThickness: 60, // 바의 너비를 60px로 고정
    categoryPercentage: 1, // 바 사이의 간격을 최소화
    barPercentage: 1 // 각 바의 비율을 최대화
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
