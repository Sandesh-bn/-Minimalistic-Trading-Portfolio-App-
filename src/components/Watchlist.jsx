import { LineChart } from "./LineChart";
import { UserList } from "./UserList";
import { useState} from 'react';
import { CryptoInfo } from './CryptoInfo'

export function Watchlist(props) {
  let { cryptoData } = props;
  const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0})

  return (
    <div className="flex h-screen p-3">
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
           <LineChart coinId={cryptoInfo.name} />
        </div>
        <div className="flex-1 pt-2 flex items-center  justify-center">
          <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]}/>
        </div>
      </div>
      <div className="flex-1">
        <UserList setCryptoInfo={setCryptoInfo} cryptoData={cryptoData}/>
      </div>
    </div>
  );
}


