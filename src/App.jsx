import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CryptoPrices } from "./components/CryptoPrices";
import { Profile } from "./components/Profile";
import { Watchlist } from "./components/Watchlist";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { House, Bitcoin, CircleUserRound, ChartCandlestickIcon, SettingsIcon } from "lucide-react";
import { defaultAssets } from "./utils/defaultAssets";

function App() {
  const k = 'CG-x1Hqm5eLU9zZ5yujBppv5aPF';
  const [cryptoData, setCryptoData] = useState([]);
  const [assets, setAssets] = useState(defaultAssets);
  
  const [overallAssetsData, setOverallAssetsdata] = useState({
    total: '',
    percentageChangeDaily: '',
    totalChangeDaily: ''
  })

  function calculatePortfolioSummary(assets) {
    let overallTotal = 0;
    let overallChange = 0;

    for (const key in assets) {
      const asset = assets[key];
      const qty = Number(asset.quantity) || 0;
      const price = Number(asset.current_price) || 0;
      const pctChange = Number(asset.price_change_percentage_24h) || 0;

      const value = qty * price;
      overallTotal += value;

      // absolute change in dollars
      overallChange += value * (pctChange / 100);
    }

    const overallChangePct =
      overallTotal !== 0 ? (overallChange / (overallTotal - overallChange)) * 100 : 0;


    setOverallAssetsdata({
      total: overallTotal.toFixed(2),
      percentageChangeDaily: overallChangePct.toFixed(2),
      totalChangeDaily: overallChange.toFixed(2),
    })
  }

  async function updateDefaultAssets() {
    try {
      const ids = Object.keys(defaultAssets).join(",");
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;
      const res = await fetch(url);
      const data = await res.json();

      const updatedAssets = { ...defaultAssets };

      data.forEach((coin) => {
        if (updatedAssets[coin.id]) {
          updatedAssets[coin.id] = {
            ...updatedAssets[coin.id],
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_24h: coin.price_change_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            assetValue: (coin.current_price * updatedAssets[coin.id].quantity).toFixed(2),
          };
        }
      });

      setAssets(updatedAssets);
      calculatePortfolioSummary(updatedAssets);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async function getCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': k } };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCryptoData();
    updateDefaultAssets();
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen">
        <aside className="w-50 bg-zinc-100 text-gray-500 p-4 flex flex-col">
          <h1 className="text-xl mb-6">Trading Portfolio</h1>
          <nav className="flex-1 space-y-3 text-small">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "font-medium text-blue-700" : ""
                }`
              }
            >
              <House className="mt-1 mr-2" size={16} /> Home
            </NavLink>

            <NavLink
              to="/prices"
              className={({ isActive }) =>
                `flex px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "font-medium text-blue-700" : ""
                }`
              }
            >
              <Bitcoin className="mt-1 mr-2" size={16} /> Crypto Prices
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "font-medium text-blue-700" : ""
                }`
              }
            >
              <CircleUserRound className="mt-1 mr-2" size={16} /> Profile
            </NavLink>

            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `flex px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "font-medium text-blue-700" : ""
                }`
              }
            >
              <ChartCandlestickIcon className="mt-1 mr-2" size={16} /> Watchlist
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "font-medium text-blue-700" : ""
                }`
              }
            >
              <SettingsIcon className="mt-1 mr-2" size={16} /> Settings
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white h-screen overflow-y-auto box-border">
          <Routes>
            <Route path="/" element={<Home overallAssetsData={overallAssetsData} assets={assets} />} />
            <Route path="/prices" element={<CryptoPrices cryptoData={cryptoData} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist cryptoData={cryptoData} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
