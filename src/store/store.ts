import {configureStore} from "@reduxjs/toolkit";
import {logosApi} from "./Apis/logosApi";
import {binancePriceApi} from "./Apis/binancePriceApi";
import coinSync from "./Slices/coinSync";
import {useDispatch} from "react-redux";
import coinsSlice from "./Slices/coinsSlice";
import {fiatApi} from "./Apis/fiatApi";
import convertSlice from "./Slices/convertSlice";
import favouriteSlice from "./Slices/favouriteSlice";
import coinStatsApi from "./Apis/coinStatsApi";

const store = configureStore({
  reducer : {
    'coinSync' : coinSync,
    'coins' : coinsSlice.reducer,
    'convert' : convertSlice.reducer,
    'favourite' : favouriteSlice.reducer,
    [fiatApi.reducerPath] : fiatApi.reducer,
    [logosApi.reducerPath] : logosApi.reducer,
    [binancePriceApi.reducerPath] : binancePriceApi.reducer,
    [coinStatsApi.reducerPath] : coinStatsApi.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware(
    // {serializableCheck : false}
  )
    .concat(logosApi.middleware)
    .concat(binancePriceApi.middleware)
    .concat(fiatApi.middleware)
    .concat(coinStatsApi.middleware)
},)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store