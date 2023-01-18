import {configureStore} from "@reduxjs/toolkit";
import {logosApi} from "./Apis/logosApi";
import {binancePriceApi} from "./Apis/binancePriceApi";
import coinSync from "./Slices/coinSync";
import {useDispatch} from "react-redux";
import coinsSlice from "./Slices/coinsSlice";

const store = configureStore({
  reducer : {
    'coinSync' : coinSync,
    'coins' : coinsSlice.reducer,
    [logosApi.reducerPath] : logosApi.reducer,
    [binancePriceApi.reducerPath] : binancePriceApi.reducer,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})
    .concat(logosApi.middleware)
    .concat(binancePriceApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store