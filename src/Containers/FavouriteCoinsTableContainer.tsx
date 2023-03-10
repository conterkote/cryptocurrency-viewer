import React, {useEffect} from 'react';
import CoinsTable from "../components/table/CoinsTable";
import {isValidCoins} from "./MainCoinsTableContainer";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../store/store";
import {useFetchLivePriceQuery} from "../store/Apis/binancePriceApi";
import {useFetchLogosQuery} from "../store/Apis/logosApi";
import {selectFavouriteSymbols} from "../store/Slices/favouriteSlice";
import {selectFiatConvertData} from "../store/Slices/convertSlice";
import {isPriceMessage, selectSyncedCoinsData} from "../store/Slices/coinSync";
import {selectOrderedCoins, updateCoins, updatePrices} from "../store/Slices/coinsSlice";
import {useCoinsDataUpdate} from "../customHooks/useCoinsDataUpdate";

function FavouriteCoinsTableContainer({}) {
  const dispatch = useAppDispatch()

  const favouriteSymbols = useSelector(selectFavouriteSymbols)
  const {data, isFetching, isSuccess} = useFetchLivePriceQuery(favouriteSymbols, {refetchOnMountOrArgChange : true})
  useFetchLogosQuery(null, {skip: !data})

  const syncedCoinsData = useSelector(selectSyncedCoinsData)

  useCoinsDataUpdate(syncedCoinsData, data, dispatch)

  const preparedCoinsData = useSelector(selectOrderedCoins)
  const preparedFiatData = useSelector(selectFiatConvertData)


  return (
    <div>
      <CoinsTable preparedCoinsData={preparedCoinsData}
                  preparedFiatData={preparedFiatData}
                  isFetching={isFetching}
                  skeletonCount={favouriteSymbols.length}
      />
      <button className={`w-full opacity-0 hover:opacity-100 transition text-[48px] py-2`}>
        +
      </button>
    </div>
  );
}

export default FavouriteCoinsTableContainer;