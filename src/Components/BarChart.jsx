import React from "react";
import { Bar } from "react-chartjs-2";

export function BarChart({ data }) {
  console.log("Data in BarChart:", data);

  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
