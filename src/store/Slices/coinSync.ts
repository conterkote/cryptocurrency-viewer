import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {binancePriceApi} from "../Apis/binancePriceApi";
import {ICoinLogo, ICoinPrice, IPrice24SocketMessage, ISymbol} from "../../models";
import {RootState} from "../store";
import {logosApi} from "../Apis/logosApi";

export interface ICoinPreparedData {
  symbol: string // BinanceAPI
  lastPrice: string // BinanceAPI
  priceChange: string // BinanceAPI
  priceChangePercent: string // BinanceAPI
}

export interface ICoinSyncedData {
  name : string
  symbol : string;
  large: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
}

export interface ICoinSyncState {
  symbols: ISymbol[],
  coinsPriceData: ICoinPreparedData[],
  syncedData: ICoinSyncedData[]
}

export function isQueryPriceResponse(response : IPrice24SocketMessage | ICoinPrice[] | undefined): response is ICoinPrice[] {
  if (response) return Array.isArray(response)
  return false
}

export function isPriceMessage(response : IPrice24SocketMessage | ICoinPrice[] | undefined): response is IPrice24SocketMessage {
  if (response) return 'e' in response
  return false;
}

const initialState: ICoinSyncState = {
  symbols: ["BTC", "BNB", "ETH", "SAND", "XRP", "SOL", "MANA", "LTC"],
  coinsPriceData: [],
  syncedData: []
}

const coinSync = createSlice({
  initialState,
  name: 'coinSync',
  reducers: {
    updatePrices : (state, { payload } : PayloadAction<IPrice24SocketMessage>) => {
      let updateTarget = state.syncedData.find(coin => coin.symbol === payload.s.replace(/USDT/, ''))
      const { c : lastPrice, P : priceChangePercent, p : priceChange } = payload
      if (updateTarget) {
        updateTarget.priceChange = priceChange
        updateTarget.priceChangePercent = priceChangePercent
        updateTarget.lastPrice = lastPrice
      }
    }
  },
  extraReducers(builder) {
    builder.addMatcher(binancePriceApi.endpoints.fetchLivePrice.matchFulfilled, (state, action) => {
      if (isQueryPriceResponse(action.payload))
      action.payload.forEach(coin => {
        const {lastPrice, priceChange, priceChangePercent, symbol} = coin
        const coinPriceData = {
          lastPrice, priceChange, priceChangePercent, symbol
        }
        state.coinsPriceData.push(coinPriceData)
      })
    })
    builder.addMatcher(logosApi.endpoints.fetchLogos.matchFulfilled, (state, action) => {
      state.coinsPriceData.forEach(coin => {
        const logoData = action.payload.coins.find(logoCoin => logoCoin.symbol === coin.symbol.replace(/USDT/, ''))
        const { symbol, large, name } = logoData as ICoinLogo;
        const syncedCoin = { ...coin, symbol, large, name }
        state.syncedData.push(syncedCoin)
      })
    })
  }
})

export const selectCurrentSymbolPriceData = (state: RootState, symbol : ISymbol) => state.coinSync.syncedData.find(coin => coin.symbol === symbol);
export const selectCurrentSymbols = (state: RootState, symbol : ISymbol) => state.coinSync.symbols
export const selectSyncedCoinsData = (state: RootState) => state.coinSync.syncedData;
export const selectCoinsPriceData = (state: RootState) => state.coinSync.coinsPriceData;

export const { updatePrices } = coinSync.actions

export default coinSync.reducer