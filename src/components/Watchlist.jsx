import { LineChart } from "./LineChart";

export function Watchlist() {
  return (
    <div className="flex h-screen">
      <div id="col1" className="flex flex-1 flex-col">
        <div id="row1" className="flex-1 border border-gray-300"></div>
        <div id="row2" className="flex-1 border border-gray-300"></div>
      </div>
      <div id="col2" className="flex-1 border border-gray-300"></div>
    </div>
  );
}


