import {createSlice} from "@reduxjs/toolkit";
import {binancePriceApi} from "../Apis/binancePriceApi";
import {ICoinPrice, ILogosData, IPrice24SocketMessage, ISymbol} from "../../models";
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
  logosHashMap: Record<ISymbol, ILogosData | undefined>,
  logosStatus : 'idle' | 'fulfilled'
}

const initialState: ICoinSyncState = {
  coinsPriceData: [],
  logosHashMap : {},
  logosStatus : 'idle'
}

const coinSync = createSlice({
  initialState,
  name: 'coinSync',
  reducers : {
  },
  extraReducers(builder) {
    builder.addMatcher(binancePriceApi.endpoints.fetchLivePrice.matchPending, (state) => {
      return {
        ...state,
        coinsPriceData : []
      }
    })
    builder.addMatcher(binancePriceApi.endpoints.fetchLivePrice.matchFulfilled, (state, action) => {
      if (isQueryPriceResponse(action.payload)) {
        const prepared = action.payload.map(coin => {
          const {lastPrice, priceChange, priceChangePercent, symbol, quoteVolume} = coin
          return {
            lastPrice, priceChange, priceChangePercent, symbol : symbol.replace(/USDT/, ''), quoteVolume
          };
        })
        return {
          ...state,
          coinsPriceData : prepared
        }
      }
    })
    builder.addMatcher(logosApi.endpoints.fetchLogos.matchFulfilled, (state, action) => {
      const logosHashMap: Record<ISymbol, ILogosData> = {}
      action.payload.coins.forEach(coin => {
        if (coin.market_cap_rank <= 1000) {
          logosHashMap[coin.symbol] = {
            name: coin.name,
            large: coin.large
          }
        }
      })
      return {
        ...state,
        logosHashMap : logosHashMap,
        logosStatus : 'fulfilled'
      }
    })
  }
})


export const selectSyncedCoinsData = (state: RootState) => {
  if (state.coinSync.logosStatus === 'fulfilled') return state.coinSync.coinsPriceData.map(coin => {
    const {name, large} = state.coinSync.logosHashMap[coin.symbol] as ILogosData
    return {
      ...coin,
      name,
      large
    }
  })
  else return []
}

export const selectCurrentLogosStatus = (state: RootState) => state.coinSync.logosStatus

export const selectCoinIcon = (state: RootState) => state.coinSync.logosHashMap

export default coinSync.reducer