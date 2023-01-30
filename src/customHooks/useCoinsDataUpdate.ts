import {useEffect} from "react";
import {isValidCoins} from "../Containers/MainCoinsTableContainer";
import {updateCoins, updatePrices} from "../store/Slices/coinsSlice";
import {isPriceMessage} from "../store/Slices/coinSync";
import {ThunkDispatch} from "@reduxjs/toolkit";

export function useCoinsDataUpdate(syncedCoinsData : any, data : any, dispatch : ThunkDispatch<any, any, any>) {
  useEffect(() => {
    console.log(syncedCoinsData)
    if (isValidCoins(syncedCoinsData)) {
      dispatch(updateCoins(syncedCoinsData))
    }
  }, [data]);

  useEffect(() => {
    if (isPriceMessage(data)) {
      dispatch(updatePrices(data))
    }
  }, [dispatch, data]);
}