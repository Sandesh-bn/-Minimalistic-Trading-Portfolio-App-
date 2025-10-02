
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function CryptoTable(props) {
    let { cryptoData, setCryptoInfo } = props;
    console.log("COININFO");
    console.log(cryptoData)

    /*
        ath
        ath_date
        current_price
        max_supply
        name
        total_supply
        market_cap
        market_cap_rank
        image
        circulating_supply
    */

    function handleRowClick(name, index){
        setCryptoInfo({ name, index })
    }


    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>%</TableHead>
                    <TableHead>24 hour high</TableHead>
                    <TableHead>24 hour low</TableHead>
                    <TableHead>24 hour volume</TableHead>
                    <TableHead>Market cap</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cryptoData && Array.isArray(cryptoData) && cryptoData.map((data, index) => (
                    <TableRow onClick={() => handleRowClick(data.id, index)} key={data.id}>
                        <TableCell className="font-medium">
                            <img className="w-5 h-5 inline m-2" src={data.image} />
                            {data.name} {data.symbol}
                        </TableCell>
                        <TableCell className="font-medium">{data.current_price}</TableCell>
                        <TableCell className={data.price_change_percentage_24h > 0 ? "text-green-700 font-medium" : "text-red-600  font-medium"}>{data.price_change_percentage_24h}</TableCell>
                        <TableCell>{data.high_24h}</TableCell>
                        <TableCell className="">{data.low_24h}</TableCell>
                        <TableCell>{data.price_change_percentage_24h}</TableCell>
                        <TableCell>{data.market_cap}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>24 hour data</TableCell>
                    <TableCell className="text-right">Top 100 most traded coins</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}