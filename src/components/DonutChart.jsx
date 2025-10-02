// DonutChart.jsx
import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// register required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

/**
 * DonutChart
 *
 * Props:
 * - labels: string[] (default [])
 * - values: number[] (default [])
 * - colors: string[] optional list of CSS colors (defaults provided)
 * - title: string optional chart title
 * - animate: boolean (default false) to enable/disable animations
 * - cutout: string | number (defaults to '70%') - donut thickness
 */
export function DonutChart({
  labels = [],
  values = [],
  colors = [],
  title = "",
  animate = false,
  cutout = "70%",
}) {
  // fallback palette if user doesn't supply colors
  const defaultPalette = [
    "#3B82F6", // blue-500
    "#10B981", // green-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#8B5CF6", // violet-500
    "#06B6D4", // cyan-500
    "#F472B6", // pink-400
    "#A78BFA", // purple-300
  ];

  const bgColors = useMemo(() => {
    if (colors && colors.length >= values.length) return colors;
    // repeat palette as needed
    return values.map((_, i) => colors[i] ?? defaultPalette[i % defaultPalette.length]);
  }, [colors, values, defaultPalette]);

  const data = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          data: values.map((v) => (Number.isFinite(Number(v)) ? Number(v) : 0)),
          backgroundColor: bgColors,
          borderWidth: 0,
        },
      ],
    }),
    [labels, values, bgColors]
  );

  const total = useMemo(
    () =>
      values
        .map((v) => (Number.isFinite(Number(v)) ? Number(v) : 0))
        .reduce((s, n) => s + n, 0),
    [values]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout,
      animation: animate
        ? {
            duration: 400,
            easing: "easeOutQuart",
          }
        : false, // disables initial animation if animate=false
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 12,
          },
        },
        title: title
          ? {
              display: true,
              text: title,
              padding: {
                bottom: 8,
              },
              font: {
                size: 14,
              },
            }
          : undefined,
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed ?? 0;
              const pct = total ? ((value / total) * 100).toFixed(2) : "0.00";
              return `${label}: ${value} (${pct}%)`;
            },
          },
        },
      },
    }),
    [title, cutout, animate, total]
  );

  return (
    <div className="w-full max-w-md h-64">
      <Doughnut data={data} options={options} />
      {/* show total below the chart */}
      <div className="text-sm text-center mt-2">
        <div className="font-semibold">Total</div>
        <div>{total}</div>
      </div>
    </div>
  );
}

export default DonutChart;
