import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { formatCurrency, toNounCase, formatLargeNumber } from '../utils/formatCurrency';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart'
export function Home(props) {

  // const [assets, setAssets] = useState(props.assets);
  let { assets, overallAssetsData } = props;
  console.log("Asss");
  console.log(assets)
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const labels = ["Bitcoin", "Ethereum", "Solana", "Other"];
  const values = [21000, 14000, 4000, 2000];
  const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444"];
  return (

    <div className="flex flex-col h-screen bg-zinc-100">

      <div className="flex flex-2 flex-wrap">

        {Object.entries(assets).map(([key, value]) => (
          <div className="w-1/2 sm:w-1/4 ">



            <div onClick={() => setSelectedCrypto(key)} className='flex flex-col p-5 bg-white border border-gray-300 rounded m-5 h-50 justify-between '>
              <div className='flex flex-row'>
                <div>
                  <img className='w-15 h-15 mr-5' src={assets[key].image} />
                </div>
                <div className=''>
                  <div className='text-xl font-semibold'>{toNounCase(key)}</div>
                  <div>{formatLargeNumber(assets[key].quantity)} {assets[key].symbol}</div>

                </div>
              </div>
              <div className=''>
                <div className='text-3xl font-bold'>{formatCurrency(assets[key].assetValue)}</div>
              </div>
              <div className="flex">
                <div className=''>{formatCurrency(assets[key].current_price)}</div>
                <span className='ml-1 font-semibold text-green-500 flex'><ArrowUp className='mt-1' size={15} />({assets[key].price_change_percentage_24h})</span>
              </div>
            </div>


          </div>
        ))}

      </div>
      {/* Row 1 - 50% height */}
      <div className="flex flex-3 flex-wrap">
        <div className="w-full sm:w-1/2">
          <LineChart coinId={selectedCrypto} />
        </div>
        <div className="w-full sm:w-1/2 pr-20 pl-5">
          <div className='flex justify-between mb-10'>
            <p className='text-4xl font-bold'>{formatCurrency(overallAssetsData.total)}</p>
            <p>{formatCurrency(overallAssetsData.totalChangeDaily)} ({overallAssetsData.percentageChangeDaily})</p>
          </div>
          <div>
            <DonutChart labels={labels} values={values} colors={colors}/>
          </div>
        </div>
      </div>

      {/* Row 2 - 50% height */}

    </div>

  )
}


