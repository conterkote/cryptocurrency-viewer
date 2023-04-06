import {useEffect} from "react";
import {isValidCoins} from "../Containers/MainCoinsTableContainer";
import {updateCoins, updatePrices} from "../store/Slices/coinsSlice";
import {isPriceMessage} from "../store/Slices/coinSync";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {ICoinSyncedData, IPrice24SocketMessage} from "../models";

export function useCoinsDataUpdate(syncedCoinsData : ICoinSyncedData[], data : any, dispatch : ThunkDispatch<any, any, any>) {
  // use this hook for dynamic update coinsTable component
  // useSelector(selectSyncedCoinsData) - syncedCoinsData
  // useFetchLivePriceQuery(mainSymbols, {refetchOnMountOrArgChange : true}) - data
  // useAppDispatch - dispatch
  // console.log('outside', syncedCoinsData)
  useEffect(() => {
    if (isValidCoins(syncedCoinsData)) {
      dispatch(updateCoins(syncedCoinsData))
    }
  }, [syncedCoinsData.length]);

  useEffect(() => {
    if (isPriceMessage(data)) {
      dispatch(updatePrices(data))
    }
  }, [dispatch, data]);
}