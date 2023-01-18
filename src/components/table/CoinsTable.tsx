import React, {useEffect} from 'react';
import CoinRow from "./CoinRow";
import {useFetchLogosQuery } from "../../store/Apis/logosApi";
import {useFetchLivePriceQuery} from "../../store/Apis/binancePriceApi";
import {useSelector} from "react-redux";
import {
  isPriceMessage,
  selectSymbols,
  selectSyncedCoinsData, updatePrices
} from "../../store/Slices/coinSync";
import {useAppDispatch} from "../../store/store";
import CoinTableHeader from "./CoinTableHeader";

function CoinsTable() {
  const mainSymbols = useSelector(selectSymbols)
  const syncedCoinData = useSelector(selectSyncedCoinsData)
  const { data } = useFetchLivePriceQuery(mainSymbols)
  useFetchLogosQuery(mainSymbols, { skip : !data})

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isPriceMessage(data)) {
      dispatch(updatePrices(data))
    }
  }, [data]);

  let coinRows = null
  if (syncedCoinData.length > 0) {
    coinRows = syncedCoinData.map(coin => <CoinRow key={coin.symbol}
                                                   symbol={coin.symbol}
                                                   name={coin.name}
                                                   priceChangePercent={coin.priceChangePercent}
                                                   lastPrice={coin.lastPrice}
                                                   volume={coin.volume}
                                                   priceChange={coin.priceChange}
                                                   icon={coin.large} />)
  }
  return (
    <div className="w-full grid bg-gradient-to-b from-dark-main rounded-xl to-dark-sub">
      <CoinTableHeader />
      { coinRows }
    </div>
  );
}

export default CoinsTable;