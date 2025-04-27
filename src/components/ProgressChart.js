'use client';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function ProgressChart({ labels, data }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Progress Chart 📈</h2>
      <Bar
        data={{
          labels,
          datasets: [{
            label: "Surahs/Matoon Memorized",
            data,
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
          }]
        }}
        options={{ responsive: true }}
      />
    </section>
  );
}
