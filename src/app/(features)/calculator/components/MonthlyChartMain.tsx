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

      backgroundColor: "rgba(217, 217, 217, 0.6)",
      borderColor: "rgba(217, 217, 217, 1)",
      borderWidth: 1
    },
    {
      label: "나의 총 배출량",
      data: currentData?.map((monthData) => monthData.carbon_emissions) || [],
      backgroundColor: "rgba(91, 202, 17, 0.6)",
      borderColor: "rgba(91, 202, 17, 1)",
      borderWidth: 1
    }
  ];

  // labels에 현재 달 기준 5달 추가
  const data = {
    labels: currentData?.map((monthData) => monthData.month) || [],
    datasets: datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "최근 5개월 탄소 배출량 비교"
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChartMain;
