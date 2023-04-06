import React from 'react';
import CoinsTable from "../components/table/CoinsTable";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../store/store";
import {useFetchLivePriceQuery} from "../store/Apis/binancePriceApi";
import {useFetchLogosQuery} from "../store/Apis/logosApi";
import {selectFavouriteSymbols} from "../store/Slices/favouriteSlice";
import {selectFiatConvertData} from "../store/Slices/convertSlice";
import {selectSyncedCoinsData} from "../store/Slices/coinSync";
import {selectOrderedCoins} from "../store/Slices/coinsSlice";
import {useCoinsDataUpdate} from "../customHooks/useCoinsDataUpdate";

function FavouriteCoinsTableContainer({}) {
  const dispatch = useAppDispatch()

  const favouriteSymbols = useSelector(selectFavouriteSymbols)
  const {data, isFetching, error} = useFetchLivePriceQuery(favouriteSymbols, {refetchOnMountOrArgChange : true})
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
                  error={error}
      />
    </div>
  );
}

export default FavouriteCoinsTableContainer;