import { useState } from 'react';
import { LineChart } from "./LineChart";
import { CryptoTable } from "./CryptoTable";
import { CryptoInfo } from './CryptoInfo';
export function CryptoPrices(props) {
    let { cryptoData } = props;
    const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0})
    return (
        <div className="h-screen flex flex-col">
           <h1 className='font-bold pt-3 px-10 text-2xl'>Top 100 Cryptocurrencies</h1>
            <div className="flex flex-1">
                <div className="flex-1 m-10">
                    <LineChart coinId={cryptoInfo.name} />
                </div>
                <div className="flex-1 my-10">
                    <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]}/>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-y-auto">
                <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />
            </div>

        </div>
    )
}
