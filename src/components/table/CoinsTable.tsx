import React  from 'react';
import CoinRow from "./CoinRow";
import {ICoinSyncedData, IFiatConvertData} from "../../models";
import CoinRowsSkeleton from "../Skeletons/CoinRowsSkeleton";
import CoinTableHeader from "./CoinTableHeader";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface ICoinsTableProps {
  preparedCoinsData : ICoinSyncedData[]
  preparedFiatData : IFiatConvertData
  isFetching : boolean
  skeletonCount ?: number
  error : FetchBaseQueryError | SerializedError | undefined
}

function CoinsTable({ preparedCoinsData, preparedFiatData, isFetching, skeletonCount, error } : ICoinsTableProps) {
  let coinRows;
  if (preparedCoinsData.length > 0 && !isFetching && !error) {
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

  } else if (error) {
    coinRows = <p className={`text-white`}>You have no data</p>
  }
  else coinRows = <CoinRowsSkeleton rowsCount={skeletonCount ? skeletonCount : 8}/>

  return (
    <div className="w-full grid bg-gradient-to-b from-dark-main/80 rounded-xl to-dark-sub">
      <CoinTableHeader />
      <div className={`min-h-[400px] ${error ? `flex-col flex items-center justify-center` : ''}`}>
        {coinRows}
      </div>
    </div>
  );
}

export default CoinsTable;