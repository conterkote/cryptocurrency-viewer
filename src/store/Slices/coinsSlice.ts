import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ICoinSliceState, ICoinSyncedData, IPrice24SocketMessage, ISymbol} from "../../models";
import Decimal from "decimal.js";

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
    addSymbol: (state, {payload}: PayloadAction<ISymbol>) => {
      return {
        ...state,
        symbols : [...state.symbols, payload]
      }
    },
    updateSymbols: (state, {payload}: PayloadAction<ISymbol[]>) => {
      return {
        ...state,
        symbols : payload
      }
    },
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
    updateOrder: (state, {payload}: PayloadAction<keyof ICoinSyncedData>) => {
      const currentOrder = state.sortConfig.sortOrder
      const currentKey = state.sortConfig.sortKey
      if (payload === currentKey) {
        const newOrder = currentOrder === 'ascn' ? 'desc' : 'ascn'
        return {
          coins: state.coins,
          symbols: state.symbols,
          sortConfig: {
            sortKey: currentKey,
            sortOrder: newOrder
          }
        }
      } else {
        return {
          coins: state.coins,
          symbols: state.symbols,
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

export const selectSortedKey = (state: RootState) => state.coins.sortConfig.sortKey
export const selectSortedOrder = (state: RootState) => state.coins.sortConfig.sortOrder

export const selectOrderedCoins = (state: RootState) => {
  if (state.coins.coins.length > 0) {
    const a = [...state.coins.coins]
    const sortKey = state.coins.sortConfig.sortKey
    const sortOrder = state.coins.sortConfig.sortOrder
    const sortMultiplier = sortOrder === 'ascn' ? 1 : -1
    return a.sort((a, b) => {
      if (sortKey !== 'symbol') {
        if (!new Decimal(a[sortKey]).greaterThan(b[sortKey])) return -1 * sortMultiplier
        else if (new Decimal(a[sortKey]).greaterThan(b[sortKey])) return 1 * sortMultiplier
        return 0
      } else {
        if (a[sortKey] > b[sortKey]) return -1 * sortMultiplier
        else if (a[sortKey] < b[sortKey]) return 1 * sortMultiplier
        return 0
      }
    })
  }
  return []
}

export const {updatePrices, updateCoins, updateOrder} = coinsSlice.actions

export default coinsSlice