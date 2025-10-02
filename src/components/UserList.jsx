import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react';
import { formatCurrency } from "../utils/formatCurrency";
import { X } from 'lucide-react';


export function UserList(props) {
    let { cryptoData, setCryptoInfo } = props;

    const [defaultList, setDefaultList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [chosenList, setChosenList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let localStorageChosenItems = JSON.parse(localStorage.getItem("chosenList"))
        console.log("Loca")
        console.log(localStorageChosenItems);
        setChosenList(localStorageChosenItems)
    },[])

    useEffect(() => {
        if (!Array.isArray(cryptoData))
            return;

        let newList = [];
        for (let i = 0; i < cryptoData.length; i++) {
            const { name, id, symbol, price_change_percentage_24h, current_price } = cryptoData[i];
            newList.push({
                name: name.toLowerCase(),
                id: id.toLowerCase(),
                symbol: symbol.toLowerCase(),
                price_change_percentage_24h,
                current_price,
                index: i
            }
            )
        }
        setDefaultList(newList);
    }, [cryptoData])
    // console.log("UL");
    // console.log(cryptoData)

    useEffect(() => {
        let currentSearchTerm = searchTerm.trim().toLowerCase();
        if (!currentSearchTerm || currentSearchTerm.length == 0) {
            setSearchResults([]);
            return;
        }

        console.log('searchterm', searchTerm)
        let newSearchResults = defaultList.filter((result) => {
            return (result.name.startsWith(currentSearchTerm) ||
                result.id.startsWith(currentSearchTerm) ||
                result.symbol.startsWith(currentSearchTerm)
            )
        })
        
        setSearchResults(newSearchResults);

    }, [searchTerm]);

    function handleAddTicker(result) {
        if (chosenList.length == 10) {
            setErrorMessage("Watchlist already has ten tickers.");
            return;
        }

        let newDefaultList = defaultList.filter(item => item.name != result.name && item.symbol != result.symbol);
        setDefaultList(newDefaultList);
        let newSearchResults = searchResults.filter(item => item.name != result.name && item.symbol != result.symbol);
        setSearchResults(newSearchResults)
        let newChosenList = [...chosenList, result]
        setChosenList(newChosenList)
        localStorage.setItem("chosenList", JSON.stringify(newChosenList));
    }

    function removeFromWatchList(result) {
        console.log("remove2456")
        console.log(result)
        let newDefaultList = [...defaultList, result]
        setDefaultList(newDefaultList);
        let newSearchResults = [...searchResults, result]
        setSearchResults(newSearchResults)
        let newChosenList = chosenList.filter(item => (item.name != result.name) && (item.symbol != result.symbol));
        setChosenList(newChosenList)
        localStorage.setItem("chosenList", JSON.stringify(newChosenList));
    }

    function handleClickWatchList(result) {
        console.log("hwfwf")
        console.log(result)
        setCryptoInfo({ name: result.name, index: result.index })
    }

    return (
        <div className="flex flex-col p-5">
            <h1 className="text-3xl font-bold mb-5">WatchList</h1>
            <Input className="relative" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="email" placeholder="Search for ticker/crypto and click to add to watchlist" />
            {searchTerm.length > 0 && <div className="absolute min-w-50 h-100 my-25 overflow-y-auto bg-zinc-100  border border-gray-300 rounded-[5px]">
                {searchResults.map((result, index) => (
                    <div onClick={() => handleAddTicker(result)} className="p-3 bg-zinc-100 border border-gray-300"><span className="font-bold mr-5">{result.name}</span> {result.symbol}</div>
                ))}
            </div>}
            {chosenList && chosenList.length > 0?
                <div className="my-8 flex flex-col border border-gray-300 rounded-[5px]">
                    {chosenList.map((result) => (
                        <div key={result.id} onClick={() => handleClickWatchList(result)} className="flex justify-between py-3 px-4  border-b border-gray-400">
                            <div>
                                <span className="mr-2 font-bold text-gray-800 text-base">{result.name}</span>
                                <span className="text-sm">{result.symbol}</span>
                            </div>
                            <div>
                                <span className="mr-2 text-sm">{formatCurrency(result.current_price)}</span>

                                <span
                                    className={result.price_change_percentage_24h > 0 ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}
                                >
                                    {result.price_change_percentage_24h}
                                </span>
                                <button className="ml-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWatchList(result);
                                    }
                                    }
                                >
                                    <X color='red' size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="my-8 flex flex-1 justify-center py-50 border border-gray-300 rounded-[5px]">
                    Watchlist is empty.
                </div>

            }
        </div>
    )
}