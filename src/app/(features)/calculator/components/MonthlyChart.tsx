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
import { MonthlyChartProps } from "@/types/calculate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const MonthlyChart: React.FC<MonthlyChartProps> = ({ currentMonthly }) => {
  const data = {
    labels: ["전기", "수도", "가스", "교통", "폐기물"],
    datasets: [
      {
        label: "저번달",
        data: [
          currentMonthly?.electricity_co2 || 0,
          currentMonthly?.water_co2 || 0,
          currentMonthly?.gas_co2 || 0,
          currentMonthly?.car_co2 || 0,
          currentMonthly?.waste_co2 || 0
        ],
        backgroundColor: "#D9D9D9",
        borderColor: "#D9D9D9",
        borderWidth: 1
      },
      {
        label: "이번달",
        data: [
          currentMonthly?.electricity_co2 || 0,
          currentMonthly?.water_co2 || 0,
          currentMonthly?.gas_co2 || 0,
          currentMonthly?.car_co2 || 0,
          currentMonthly?.waste_co2 || 0
        ],
        backgroundColor: "#5BCA11",
        borderColor: "#5BCA11",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "이번달 탄소 배출량"
      }
    }
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
