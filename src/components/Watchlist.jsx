// import { LineChart } from "./LineChart";
// import { useState, useEffect } from 'react';

// export function Watchlist(props) {
//     let { coinData } = props;
//     console.log("CP");
//     console.log(coinData)
//     // if (Array.isArray(coinData.prices)){
//     //     console.log(coinData.prices[9])
//     //     console.log("HHH\n\n")
//     //     let row = coinData.prices[9];
//     //     console.log("R0: ", row[0]);
//     //     console.log("R1: ", row[1]);
//     //     console.log("\n")
//     // }
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [],
//     });

//     useEffect(() => {
//         console.log("INSIDE UE\n")
//         let newLabel = [];
//         let newDataSet = [];
//         if (Array.isArray(coinData.prices)) {
//             for (let i = 0; i < 10; i++) {
//                 console.log("INSIDE forloop\n")
//                 let row = coinData.prices[i]
//                 console.log('row');
//                 console.log(row)
//                 newLabel.push(row[0]);
//                 newDataSet.push(parseInt(row[1]))
//             }
//             setChartData({
//                 labels: newLabel,
//                 datasets: newDataSet
//             })
//         }

//     }, [coinData]);

//     console.log("State");
//     console.log(chartData)

//     useEffect(() => {
//         const DATA_COUNT = 7;
//         setChartData({
//             // labels: ["Mon", "Tue", "Wed", "Thue", "Fri", "Sat", "Sun"],
//             labels: chartData.labels,
//             datasets: [
//                 {
//                     label: 'Dataset 1',
//                     // data: [12, 15, 18, 19, 20, 22, 27],
//                     data: chartData.datasets,
//                     borderColor: 'red',
//                     backgroundColor: 'transparent',
//                 },
//             ]
//         })
//     }, []);

//     return (
//         <div>
//             <h1 className="text-2xl">👤 Your watchlist Page</h1>
//             <LineChart chartData={chartData} />
//         </div>
//     )

// }

import { LineChart } from "./LineChart";

export function Watchlist() {
  
  return (
    <div>
      <h1 className="text-2xl mb-4">📈 Crypto Watchlist</h1>
      <LineChart />
    </div>
  );
}
