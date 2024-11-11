import { MonthlyData } from "@/types/calculate";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import ChartDataLabels from "chartjs-plugin-datalabels";

interface MonthlyChartMainProps {
  emissionsData: MonthlyData[] | null; // 평균 배출량 데이터
  currentData: MonthlyData[] | null;
}

const MonthlyChartMain: React.FC<MonthlyChartMainProps> = ({
  emissionsData,
  currentData
}) => {
  // 평균 배출량 데이터와 총 배출량을 기반으로 datasets 구성
  const datasets = [
    {
      label: "평균 배출량",
      data: emissionsData?.map((monthData) => monthData.carbon_emissions) || [],

      backgroundColor: ["#D9D9D9"],
      borderColor: ["#D9D9D9"],
      borderWidth: 1,
      borderRadius: [8, 8]
    },
    {
      label: "나의 총 배출량",
      data: currentData?.map((monthData) => monthData.carbon_emissions) || [],
      backgroundColor: ["#FF7D6F"],
      borderColor: ["#FF7D6F"],
      borderWidth: 1,
      borderRadius: [8, 8]
    }
  ];

  // labels에 현재 달 기준 5달 추가
  const data = {
    labels:
      currentData?.map(
        (monthData) => `${String(monthData.month).padStart(2, "0")}월`
      ) || [],
    datasets: datasets
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          padding: 10 // 범례와 차트 사이의 간격 설정
        }
      },
      title: {
        display: false
      },
      datalabels: {
        align: "end" as const, // 타입 오류를 방지하기 위해 'as const' 추가
        anchor: "end" as const, // 타입 오류를 방지하기 위해 'as const' 추가
        color: "#32343a", // 레이블 색상 설정
        font: {
          size: 14 // 레이블 폰트 크기 설정
        },
        formatter: (value: number) => `${value} Kg` // 값 뒤에 "Kg" 추가
      }
    },
    layout: {
      padding: {
        top: 50,
        bottom: 30
      }
    },
    scales: {
      y: {
        display: false, // y축 표시
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 14
          },
          max: 140 // y축의 최대값을 140으로 설정
        }
      },
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 14
          }
        },
        barThickness: 50, // 바의 너비를 설정
        categoryPercentage: 0.2,
        barPercentage: 1,
        maxBarThickness: 140 // 바의 최대 두께를 140px로 설정
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default MonthlyChartMain;
