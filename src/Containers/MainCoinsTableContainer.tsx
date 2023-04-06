import React, {useEffect} from 'react';
import {useFetchLogosQuery} from "../store/Apis/logosApi";
import {useFetchLivePriceQuery} from "../store/Apis/binancePriceApi";
import {useSelector} from "react-redux";
import {
  isPriceMessage, selectCurrentLogosStatus,
  selectSyncedCoinsData
} from "../store/Slices/coinSync";
import {useAppDispatch} from "../store/store";
import CoinTableHeader from "../components/table/CoinTableHeader";
import {
  selectOrderedCoins,
  selectSymbols,
  updateCoins,
  updatePrices
} from '../store/Slices/coinsSlice'
import {ICoinSyncedData} from "../models";
import {selectFiatConvertData} from "../store/Slices/convertSlice";
import CoinsTable from "../components/table/CoinsTable";
import {useCoinsDataUpdate} from "../customHooks/useCoinsDataUpdate";

export function isValidCoins(coins: ICoinSyncedData[] | Partial<ICoinSyncedData>[]): coins is ICoinSyncedData[] {
  return coins.length > 0
}

function MainCoinsTableContainer() {
  const mainSymbols = useSelector(selectSymbols)

  const {data, isFetching, error} = useFetchLivePriceQuery(mainSymbols, {refetchOnMountOrArgChange : true})
  const {data : logosData} = useFetchLogosQuery(null, {skip: !data})

  const dispatch = useAppDispatch()
  const syncedCoinsData = useSelector(selectSyncedCoinsData)

  useCoinsDataUpdate(syncedCoinsData, data, dispatch)

  const preparedCoinsData = useSelector(selectOrderedCoins)
  const preparedFiatData = useSelector(selectFiatConvertData)

  let coinRows = null

  return (
    <div className="w-full grid bg-gradient-to-b from-dark-main rounded-xl to-dark-sub">
      <CoinsTable preparedCoinsData={preparedCoinsData}
                  preparedFiatData={preparedFiatData}
                  isFetching={isFetching}
                  skeletonCount={mainSymbols.length}
                  error={error}
      />
    </div>
  );
}

export default MainCoinsTableContainer;