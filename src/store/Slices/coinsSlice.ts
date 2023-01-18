import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ICoinSyncedData, IPrice24SocketMessage, ISymbol} from "../../models";
import Decimal from "decimal.js";

export interface ICoinSliceState {
  symbols : ISymbol[],
  coins : ICoinSyncedData[]
  sortConfig : {
    sortOrder : 'ascn' | 'desc',
    sortKey : keyof ICoinSyncedData
  }
}

const initialState: ICoinSliceState = {
  symbols : ["BTC", "BNB", "ETH", "SAND", "XRP", "SOL", "MANA", "LTC"],
  coins : [],
  sortConfig : {
    sortOrder : 'desc',
    sortKey : "volume"
  }
}

const coinsSlice = createSlice({
  name : 'coins',
  initialState,
  reducers: {
    updatePrices : (state, { payload } : PayloadAction<IPrice24SocketMessage>) => {
      let updateTarget = state.coins.find(coin => coin.symbol === payload.s.replace(/USDT/, ''))
      const { c : lastPrice, P : priceChangePercent, p : priceChange, v : volume } = payload
      if (updateTarget) {
        updateTarget.priceChange = priceChange
        updateTarget.priceChangePercent = priceChangePercent
        updateTarget.lastPrice = lastPrice
        updateTarget.volume = volume
      }
    },
    updateCoins : (state, { payload } : PayloadAction<ICoinSyncedData[]>) => {
      return {
        symbols : state.symbols,
        coins : [...payload],
        sortConfig : state.sortConfig
      }
    }
  }
})

export const selectSymbols = (state : RootState) => state.coins.symbols
export const selectCoins = (state : RootState) => state.coins.coins

export const selectOrderedCoins = (state : RootState) => {
  const a = [...state.coins.coins]
  const sortKey = state.coins.sortConfig.sortKey
  const sortOrder = state.coins.sortConfig.sortOrder
  switch (sortOrder) {
    case 'ascn':
      return a.sort((a, b) => {
        if (new Decimal(a[sortKey]).greaterThan(b[sortKey])) return -1
        else if (!new Decimal(a[sortKey]).greaterThan(b[sortKey])) return 1
        return 0
      })
    case 'desc':
      return a.sort((a, b) => {
        if (!new Decimal(a[sortKey]).greaterThan(b[sortKey])) return -1
        else if (new Decimal(a[sortKey]).greaterThan(b[sortKey])) return 1
        return 0
      })
  }
}


export const selectCoinsDecreasedBy =
  (state : RootState, property: string) => {
    const a = [...state.coins.coins]
    return a.sort((a, b) => {
      if (new Decimal(a[property]).greaterThan(b[property])) return -1
      else if (!new Decimal(a[property]).greaterThan(b[property])) return 1
      return 0
    })
  }

export const { updatePrices, updateCoins } = coinsSlice.actions

export default coinsSlice