import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import instance from "../axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Grafik1() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    instance
      .get("/laporan2")
      .then((response) => {
        const bulan = response.data.data.map((item) => item.bulan);
        const grup = response.data.data.map((item) => item.grup);
        const personal = response.data.data.map((item) => item.personal);
        const total = response.data.data.map((item) => item.total);

        setChartData({
          labels: bulan,
          datasets: [
            {
              label: "Grup",
              data: grup,
              backgroundColor: ["rgba(79,129,189)"],
              borderWidth: 1,
            },
            {
              label: "Personal",
              data: personal,
              backgroundColor: ["rgba(192,80,77)"],
              borderWidth: 1,
            },
            {
              label: "Total",
              data: total,
              backgroundColor: ["rgba(155,187,89)"],
              borderWidth: 1,
            },
          ],
        });
      })

      .catch((err) => {
        alert(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
        console.error(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
      });
  }, []);

  console.log(chartData);

  if (Object.keys(chartData).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-12">
      <Bar data={chartData} />
    </div>
  );
}
