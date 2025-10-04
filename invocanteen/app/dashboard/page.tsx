"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ProductSales = {
  id: number;
  productName: string;
  quantity: number;
  createdAt: string;
};

type StatsResponse = {
  type: "daily" | "monthly" | "yearly";
  date?: string;
  month?: string;
  year?: number;
  count: number;
  data: ProductSales[];
};

// Dummy product generator
function generateDummyData(
  type: "daily" | "monthly" | "yearly"
): StatsResponse {
  const products = [
    "Fried Rice",
    "Grilled Chicken",
    "Fried Noodles",
    "Chicken Satay",
    "Iced Tea",
    "Black Coffee",
  ];

  const sales: ProductSales[] = products.map((p, idx) => ({
    id: idx + 1,
    productName: p,
    quantity: Math.floor(Math.random() * 50) + 5, // minimal 5, max 55
    createdAt: new Date().toISOString(),
  }));

  return {
    type,
    date: type === "daily" ? "2025-09-08" : undefined,
    month: type === "monthly" ? "2025-09" : undefined,
    year: type === "yearly" ? 2025 : undefined,
    count: sales.reduce((acc, s) => acc + s.quantity, 0),
    data: sales,
  };
}

export default function DashboardPage() {
  const [type, setType] = useState<"daily" | "monthly" | "yearly">("daily");
  const stats = generateDummyData(type);

  // Chart data
  const chartData = {
    labels: stats.data.map((o) => o.productName),
    datasets: [
      {
        label: "Qty",
        data: stats.data.map((o) => o.quantity),
        backgroundColor: [
          "rgba(37, 99, 235, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(249, 115, 22, 0.6)",
          "rgba(236, 72, 153, 0.6)",
          "rgba(132, 204, 22, 0.6)",
          "rgba(168, 85, 247, 0.6)",
        ],
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { boxWidth: 12, font: { size: 10 } },
      },
      title: {
        display: true,
        text: `Statistics (${stats.type.toUpperCase()})`,
        font: { size: 12 },
      },
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 } } },
    },
  };

  // display period according to type
  const getPeriodLabel = (stats: StatsResponse) => {
    if (stats.type === "daily") return stats.date;
    if (stats.type === "monthly") return stats.month;
    if (stats.type === "yearly") return stats.year;
    return "";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />

      <main className="  pl-[var(--sidebar-w)] transition-[padding] duration-200 p-3 w-full">
        <div className="px-6 py-4 ">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-[14px] text-gray-600 mb-2">
            Product sales statistics
          </p>

          {/* Filter Buttons */}
          <div className="flex gap-1 mb-2 ">
            {["daily", "monthly", "yearly"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t as any)}
                className={`px-2 py-1 rounded-md border text-[11px] font-medium capitalize transition ${type === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-white p-2 rounded-md shadow text-center">
              <p className="text-gray-500 text-[10px]">Total Sold</p>
              <h2 className="text-sm font-semibold">{stats.count} pcs</h2>
            </div>
            <div className="bg-white p-2 rounded-md shadow text-center">
              <p className="text-gray-500 text-[10px]">Number of Products</p>
              <h2 className="text-sm font-semibold">{stats.data.length}</h2>
            </div>
            <div className="bg-white p-2 rounded-md shadow text-center">
              <p className="text-gray-500 text-[10px]">Period</p>
              <h2 className="text-sm font-semibold">{getPeriodLabel(stats)}</h2>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-3 rounded-md shadow w-full h-140 flex justify-center">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
}
