import { useState } from 'react';
import { LineChart } from "./LineChart";
import { CryptoTable } from "./CryptoTable";
import { CryptoInfo } from './CryptoInfo';
export function CryptoPrices(props) {
    let { cryptoData } = props;
    const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0})
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 p-8">
                <div className="flex-1">
                    <LineChart coinId={cryptoInfo.name} />
                </div>
                <div className="flex-1">
                    <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]}/>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-y-auto">
                <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />
            </div>

        </div>
    )
}
