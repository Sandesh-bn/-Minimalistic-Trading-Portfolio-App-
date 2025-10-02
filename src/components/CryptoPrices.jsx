import { useState } from 'react';
import { LineChart } from "./LineChart";
import { CryptoTable } from "./CryptoTable";
import { CryptoInfo } from './CryptoInfo';
import { Bitcoin } from 'lucide-react';
export function CryptoPrices(props) {
    let { cryptoData } = props;
    const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0})
    return (
        <div className="h-screen flex flex-col border border-gray-300">
           <h1 className='font-bold pt-3 px-10 text-2xl flex'>Top 100 Cryptocurrencies</h1>
            <div className="flex flex-1">
                <div className="flex-1 m-10">
                    <LineChart coinId={cryptoInfo.name} />
                </div>
                <div className="flex-1 mt-15">
                    <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]}/>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-y-auto">
                <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />
            </div>
        </div>
    )
}
