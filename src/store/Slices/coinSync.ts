import {createSlice} from "@reduxjs/toolkit";
import {binancePriceApi} from "../Apis/binancePriceApi";
import {ICoinLogo, ICoinPrice, ICoinSyncedData, IPrice24SocketMessage, ISymbol} from "../../models";
import {RootState} from "../store";
import {logosApi} from "../Apis/logosApi";

export function isQueryPriceResponse(response : IPrice24SocketMessage | ICoinPrice[] | undefined): response is ICoinPrice[] {
  if (response) return Array.isArray(response)
  return false
}

export function isPriceMessage(response : IPrice24SocketMessage | ICoinPrice[] | undefined): response is IPrice24SocketMessage {
  if (response) return 'e' in response
  return false;
}

export interface ICoinPreparedData {
  symbol: string // BinanceAPI
  lastPrice: string // BinanceAPI
  priceChange: string // BinanceAPI
  priceChangePercent: string // BinanceAPI
  quoteVolume: string
}

export interface ICoinSyncState {
  coinsPriceData: ICoinPreparedData[],
  syncedData: ICoinSyncedData[]
}

const initialState: ICoinSyncState = {
  coinsPriceData: [],
  syncedData: []
}

const coinSync = createSlice({
  initialState,
  name: 'coinSync',
  reducers : {
  },
  extraReducers(builder) {
    builder.addMatcher(binancePriceApi.endpoints.fetchLivePrice.matchFulfilled, (state, action) => {
      if (isQueryPriceResponse(action.payload))
      action.payload.forEach(coin => {
        const {lastPrice, priceChange, priceChangePercent, symbol, quoteVolume} = coin
        const coinPriceData = {
          lastPrice, priceChange, priceChangePercent, symbol, quoteVolume
        }
        state.coinsPriceData.push(coinPriceData)
      })
    })
    builder.addMatcher(logosApi.endpoints.fetchLogos.matchFulfilled, (state, action) => {
      state.coinsPriceData.forEach(coin => {
        const logoData = action.payload.coins.find(logoCoin => logoCoin.symbol === coin.symbol.replace(/USDT/, ''))
        if (logoData) {
          const { symbol, large, name } = logoData as ICoinLogo;
          const syncedCoin = { ...coin, symbol, large, name }
          state.syncedData.push(syncedCoin)
        }
      })
    })
  }
})

export const selectCurrentSymbolPriceData = (state: RootState, symbol : ISymbol) => state.coinSync.syncedData.find(coin => coin.symbol === symbol);
export const selectSyncedCoinsData = (state: RootState) => state.coinSync.syncedData;

export default coinSync.reducer