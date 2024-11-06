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
        display: true // 범례 표시
        // position: "top", // 범례 위치 설정
        // align: "end", // 범례 정렬
        // labels: {
        //   usePointStyle: true // 범례의 색상을 원형으로 변경
        // }
      },
      title: {
        display: true
        // text: "이번달 탄소 배출량"
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
        },
        barThickness: 50, // 바의 너비를 60px로 고정
        categoryPercentage: 0.2, // 카테고리의 크기를 적당히 설정하여 간격을 조정
        barPercentage: 1 // 바의 비율을 조정하여 간격을 적당히 만듦
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
    </div>
  );
};

export default MonthlyChartMain;
