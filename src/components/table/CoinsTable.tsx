import React, {useEffect } from 'react';
import CoinRow from "./CoinRow";
import {useFetchLogosQuery} from "../../store/Apis/logosApi";
import {useFetchLivePriceQuery} from "../../store/Apis/binancePriceApi";
import {useSelector} from "react-redux";
import {
  isPriceMessage,
  selectSyncedCoinsData
} from "../../store/Slices/coinSync";
import {useAppDispatch} from "../../store/store";
import CoinTableHeader from "./CoinTableHeader";
import {
  selectOrderedCoins,
  selectSymbols,
  updateCoins,
  updatePrices
} from '../../store/Slices/coinsSlice'
import {ICoinSyncedData} from "../../models";
import CoinRowsSkeleton from "../Skeletons/CoinRowsSkeleton";
import {selectConvertCurrency, selectConvertRatio} from "../../store/Slices/convertSlice";

function isValidCoins(coins: ICoinSyncedData[] | []): coins is ICoinSyncedData[] {
  return coins.length > 0
}

function CoinsTable() {
  const mainSymbols = useSelector(selectSymbols)
  const {data} = useFetchLivePriceQuery(mainSymbols)
  useFetchLogosQuery(mainSymbols, {skip: !data})

  const syncedCoinsData = useSelector(selectSyncedCoinsData)
  const currentRatio = useSelector(selectConvertRatio);
  const currentCurrency = useSelector(selectConvertCurrency);

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isValidCoins(syncedCoinsData)) dispatch(updateCoins(syncedCoinsData))
  }, [syncedCoinsData]);


  useEffect(() => {
    if (isPriceMessage(data)) {
      dispatch(updatePrices(data))
    }
  }, [data]);

  const preparedCoinsData = useSelector(selectOrderedCoins)

  let coinRows = null
  if (preparedCoinsData.length > 0) {
    coinRows = preparedCoinsData.map(coin => <CoinRow key={coin.symbol}
                                                      symbol={coin.symbol}
                                                      name={coin.name}
                                                      priceChangePercent={coin.priceChangePercent}
                                                      lastPrice={coin.lastPrice}
                                                      quoteVolume={coin.quoteVolume}
                                                      priceChange={coin.priceChange}
                                                      currencyRatio={currentRatio}
                                                      currentCurrency={currentCurrency}
                                                      icon={coin.large}/>)

  } else coinRows = <CoinRowsSkeleton rowsCount={mainSymbols.length}/>

  return (
    <div className="w-full grid bg-gradient-to-b from-dark-main rounded-xl to-dark-sub">
      <CoinTableHeader/>
      {coinRows}
    </div>
  );
}

export default CoinsTable;