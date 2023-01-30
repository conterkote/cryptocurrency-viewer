import React  from 'react';
import CoinRow from "./CoinRow";
import {ICoinSyncedData, IFiatConvertData} from "../../models";
import CoinRowsSkeleton from "../Skeletons/CoinRowsSkeleton";
import CoinTableHeader from "./CoinTableHeader";

export interface ICoinsTableProps {
  preparedCoinsData : ICoinSyncedData[]
  preparedFiatData : IFiatConvertData
  isFetching : boolean
  skeletonCount ?: number
}

function CoinsTable({ preparedCoinsData, preparedFiatData, isFetching, skeletonCount } : ICoinsTableProps) {
  let coinRows;
  if (preparedCoinsData.length > 0 && !isFetching) {
    coinRows = preparedCoinsData.map(coin => <CoinRow key={coin.symbol}
                                                      symbol={coin.symbol}
                                                      name={coin.name}
                                                      priceChangePercent={coin.priceChangePercent}
                                                      lastPrice={coin.lastPrice}
                                                      quoteVolume={coin.quoteVolume}
                                                      priceChange={coin.priceChange}
                                                      currencyRatio={preparedFiatData.currentRatioToUsd}
                                                      currentCurrency={preparedFiatData.currentSymbol}
                                                      icon={coin.large}/>)

  } else coinRows = <CoinRowsSkeleton rowsCount={skeletonCount ? skeletonCount : 8}/>

  return (
    <div className="w-full grid bg-gradient-to-b from-dark-main rounded-xl to-dark-sub">
      <CoinTableHeader />
      {coinRows}
    </div>
  );
}

export default CoinsTable;