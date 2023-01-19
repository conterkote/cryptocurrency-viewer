import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ICoinSyncedData, IPrice24SocketMessage, ISymbol} from "../../models";
import Decimal from "decimal.js";

export interface ICoinSliceState {
  symbols: ISymbol[],
  coins: ICoinSyncedData[]
  sortConfig: {
    sortOrder: 'ascn' | 'desc',
    sortKey: keyof ICoinSyncedData
  }
}

const initialState: ICoinSliceState = {
  symbols: ["BTC", "BNB", "ETH", "SAND", "XRP", "SOL", "MANA", "LTC"],
  coins: [],
  sortConfig: {
    sortOrder: 'ascn',
    sortKey: "quoteVolume"
  }
}

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    updatePrices: (state, {payload}: PayloadAction<IPrice24SocketMessage>) => {
      let updateTarget = state.coins.find(coin => coin.symbol === payload.s.replace(/USDT/, ''))
      const {c: lastPrice, P: priceChangePercent, p: priceChange, q: quoteVolume} = payload
      if (updateTarget) {
        updateTarget.priceChange = priceChange
        updateTarget.priceChangePercent = priceChangePercent
        updateTarget.lastPrice = lastPrice
        updateTarget.quoteVolume = quoteVolume
      }
    },
    updateCoins: (state, {payload}: PayloadAction<ICoinSyncedData[]>) => {
      return {
        symbols: state.symbols,
        coins: [...payload],
        sortConfig: state.sortConfig
      }
    },
    updateOrder : (state, { payload } : PayloadAction<keyof ICoinSyncedData>) => {
      const currentOrder = state.sortConfig.sortOrder
      const currentKey = state.sortConfig.sortKey
      if (payload === currentKey) {
      const newOrder = currentOrder === 'ascn' ? 'desc' : 'ascn'
        return {
          coins : state.coins,
          symbols : state.symbols,
          sortConfig: {
            sortKey: currentKey,
            sortOrder: newOrder
          }
        }
      } else {
        return {
          coins : state.coins,
          symbols : state.symbols,
          sortConfig: {
            sortKey: payload,
            sortOrder: 'desc'
          }
        }
      }
    }
  }
})

export const selectSymbols = (state: RootState) => state.coins.symbols
export const selectCoins = (state: RootState) => state.coins.coins

export const selectSortedKey = (state : RootState) => state.coins.sortConfig.sortKey
export const selectSortedOrder = (state : RootState) => state.coins.sortConfig.sortOrder

export const selectOrderedCoins = (state: RootState) => {
  if (state.coins.coins.length > 0) {
    const a = [...state.coins.coins]
    const sortKey = state.coins.sortConfig.sortKey
    const sortOrder = state.coins.sortConfig.sortOrder
    return a.sort((a, b) => {
      switch (sortOrder) {
        case 'ascn': {
          if (sortKey !== 'symbol') {
            if (!new Decimal(a[sortKey]).greaterThan(b[sortKey])) return -1
            else if (new Decimal(a[sortKey]).greaterThan(b[sortKey])) return 1
            return 0
          } else {
            if (!(a[sortKey] > b[sortKey])) return -1
            else if (a[sortKey] > b[sortKey]) return 1
            return 0
          }
        }
        case 'desc':
          if (sortKey !== 'symbol') {
            if (new Decimal(a[sortKey]).greaterThan(b[sortKey])) return -1
            else if (!new Decimal(a[sortKey]).greaterThan(b[sortKey])) return 1
            return 0
          }
          else {
            if (a[sortKey] > b[sortKey]) return -1
            else if (!(a[sortKey] > b[sortKey])) return 1
            return 0
          }
      }
    })
  }
  return []
}

export const {updatePrices, updateCoins, updateOrder} = coinsSlice.actions

export default coinsSlice