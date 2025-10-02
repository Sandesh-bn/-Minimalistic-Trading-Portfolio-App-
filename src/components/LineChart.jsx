import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { toNounCase } from "../utils/formatCurrency";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Spinner } from '@/components/ui/shadcn-io/spinner';


// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function LineChart({ coinId = "bitcoin", days = 7 }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId || !days) return;

    setLoading(true);
    setError(null);

    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if (!data.prices) throw new Error("No price data returned");

        const labels = data.prices.map((p) => {
          const date = new Date(p[0]);
          return days === 1
            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : date.toLocaleDateString([], { month: "short", day: "numeric" });
        });
        const prices = data.prices.map((p) => p[1]);

        setChartData({
          labels,
           datasets: [
            {
                fill: true,
                label: `${toNounCase(coinId)} Price (USD)`,
                data: prices,
                borderColor: 'rgba(9, 192, 88, 1)',
                backgroundColor: 'rgba(53, 235, 59, 0.5)',
            },
        ],
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [coinId, days]);

  if (loading) return (
    <div className="flex justify-center items-center h-full">
        <Spinner key={'bars'} variant={'bars'} />
    </div>
  )
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Line options={{ animation: false}} data={chartData} />
    </div>
  );
}
