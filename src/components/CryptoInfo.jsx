import { formatCurrency, formatLargeNumber } from "../utils/formatCurrency";

export function CryptoInfo(props) {
    const { selectedCoinInfo } = props;

    if (!selectedCoinInfo) {
        return (
            <div>
                Coin info unavailable.
            </div>
        )
    }
    const { image, name, current_price, market_cap, ath, ath_date,
        max_supply, market_cap_rank, price_change_percentage_24h
    } = selectedCoinInfo;

    const allTimeHighDate = new Date(ath_date).toLocaleString();
    return (
        <div className="flex flex-col p-5 mr-10 border border-zinc-800 rounded-[5px] bg-gradient-to-b from-slate-800 to-zinc-900">
            
            <div className="flex flex-1">
                <img className="w-10 h-10 mx-5" src={image} />
                <p className="text-2xl font-bold text-[#e6e6ea]">{name}</p>
            </div>
            <div className="flex flex-row">
                <p className="text-4xl py-5 font-bold text-[#e6e6ea] ">{formatCurrency(current_price)}</p>
                <span
                    className={`${price_change_percentage_24h > 0 ? 'bg-green-500' : 'bg-red-500'
                        } h-8 mx-4 my-7 text-white text-center p-[5px] rounded-md`}
                >
                    {price_change_percentage_24h.toFixed(2)}% (24h)</span>
            </div>
            <div>
                <div className="flex justify-between"><p className="text-sm py-1 text-zinc-300">Market Cap:</p> <p  className="text-sm py-1 text-zinc-300">{formatCurrency(market_cap)}</p></div>
                <div className="flex justify-between"><p className="text-sm py-1 text-zinc-300">All Time High:</p> <p className="text-sm py-1 text-zinc-300"> {formatCurrency(ath)}</p></div>
                <div className="flex justify-between"><p className="text-sm py-1 text-zinc-300">Max Supply:</p> <p  className="text-sm py-1 text-zinc-300">{formatLargeNumber(max_supply)}</p></div> 
            </div>
            {/* {JSON.stringify(selectedCoinInfo)} */}
        </div>
    )
}