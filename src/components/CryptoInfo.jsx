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
        <div className="flex flex-col p-5 mx-5 border border-gray-300 rounded-[5px]">
            <div className="flex flex-1">
                <img className="w-10 h-10 mx-5" src={image} />
                <p className="text-2xl font-bold text-gray-500">{name}</p>
            </div>
            <div className="flex flex-row">
                <p className="text-4xl py-5 font-bold text-gray-600">{formatCurrency(current_price)}</p>
                <span
                    className={`${price_change_percentage_24h > 0 ? 'bg-green-500' : 'bg-red-500'
                        } h-8 mx-4 my-7 text-white text-center p-[5px] rounded-md`}
                >
                    {price_change_percentage_24h} (24h)</span>
            </div>
            <div>
                <p className="text-small py-3 text-zinc-600">Market Cap: {formatCurrency(market_cap)}</p>
                <p className="text-small py-3 text-zinc-600">All Time High: {formatCurrency(ath)} on {allTimeHighDate}</p>
                <p className="text-small py-3 text-zinc-600">Max Supply: {formatLargeNumber(max_supply)}</p>
            </div>
            {/* {JSON.stringify(selectedCoinInfo)} */}
        </div>
    )
}