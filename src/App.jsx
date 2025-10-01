import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CryptoPrices } from "./components/CryptoPrices";
import { Profile } from "./components/Profile";
import { Watchlist } from "./components/Watchlist";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
function App() {
  const [cryptoData, setCryptoData] = useState([])
  async function getCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-x1Hqm5eLU9zZ5yujBppv5aPF' }, body: undefined };

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
  }, []);


  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
          <h1 className="text-xl font-bold mb-6">Trading App</h1>
          <nav className="flex-1 space-y-3">
            <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700">
              Home
            </Link>
            <Link to="/prices" className="block px-3 py-2 rounded hover:bg-gray-700">
              Crypto Prices
            </Link>

            <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-700">
              Profile
            </Link>
            <Link to="/watchlist" className="block px-3 py-2 rounded hover:bg-gray-700">
              Watchlist
            </Link>
            <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<CryptoPrices cryptoData={cryptoData} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
