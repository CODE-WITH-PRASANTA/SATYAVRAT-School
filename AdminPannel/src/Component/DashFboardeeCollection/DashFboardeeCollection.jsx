import React from "react";
import "./DashFboardeeCollection.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const DashFboardeeCollection = ({ darkMode, data: dashboardData }) => {
  const overview = dashboardData?.monthlyOverview || {};
  const labels =
    overview.labels?.length > 0
      ? overview.labels
      : Array.from({ length: 30 }, (_, index) => String(index + 1).padStart(2, "0"));
  const collectionData = overview.collection || new Array(labels.length).fill(0);
  const expenseData = overview.expense || new Array(labels.length).fill(0);
  const incomeData = overview.income || new Array(labels.length).fill(0);
  const inventorySalesData = overview.inventorySales || new Array(labels.length).fill(0);
  const maxChartValue = Math.max(
    100,
    ...collectionData,
    ...expenseData,
    ...incomeData,
    ...inventorySalesData,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Collection",
        data: collectionData,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,.25)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: "Income",
        data: incomeData,
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        pointRadius: 3,
      },
      {
        label: "Inventory Sales",
        data: inventorySalesData,
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          color: darkMode ? "#ffffff" : "#334155",
          padding: 20,
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.ceil(maxChartValue * 1.2),

        ticks: {
          color: darkMode ? "#cbd5e1" : "#64748b",
          callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },

        grid: {
          color: darkMode ? "#475569" : "#e5e7eb",
        },

        title: {
          display: true,
          text: "Values",
          color: darkMode ? "#ffffff" : "#334155",
        },
      },

      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#334155",
        },

        grid: {
          color: darkMode ? "#334155" : "#eef2ff",
        },
      },
    },
  };

  return (
    <section className="DashFboardeeCollection">
      <div className="DashFboardeeCollection_Card">
        <div className="DashFboardeeCollection_Header">
          <h2>Fee Collection Overview</h2>
          <p>{dashboardData?.meta?.monthLabel || "Monthly Collection Analytics"}</p>
        </div>

        <div className="DashFboardeeCollection_GraphWrap">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default DashFboardeeCollection;
