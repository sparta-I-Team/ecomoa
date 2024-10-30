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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ThisMonthChart: React.FC<ThisMonthChartProps> = ({
  currentMonthly,
  totalCurrentMonthly
}) => {
  const currentData = currentMonthly || {
    electricity_co2: 0,
    water_co2: 0,
    gas_co2: 0,
    car_co2: 0,
    waste_co2: 0,
    carbon_emissions: 0
  };
  const totalData = totalCurrentMonthly || {
    electricity_co2: 0,
    water_co2: 0,
    gas_co2: 0,
    car_co2: 0,
    waste_co2: 0,
    carbon_emissions: 0
  };

  const data = {
    labels: ["저번달", "이번달"],
    datasets: [
      {
        label: "평균 배출량",
        data: [
          totalData?.carbon_emissions || 0,
          currentData?.carbon_emissions || 0
        ],
        backgroundColor: "#D9D9D9",
        borderColor: "#D9D9D9",
        borderWidth: 1
      },
      {
        label: "나의 총 배출량",
        data: [
          currentData?.carbon_emissions || 0,
          totalData?.carbon_emissions || 0
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

export default ThisMonthChart;
