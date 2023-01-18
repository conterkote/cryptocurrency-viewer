import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  ICoinAveragePrice,
  ICoinPrice,
  ICoinsPairQuery,
  IPrice24SocketMessage,
  ISymbol,
} from "../../models";
import {isPriceMessage} from "../Slices/coinSync";

// GET /api/v3/ticker/24hr?symbol='BTCUSDT' -- 24 hr ticket price change statistics
// GET /api/v3/ticker/24hr?symbols=['BTCUSDT', 'ETHUSDT'] -- 24 hr ticket prices change statistics []

// const apiKey = 'CaHOlEFyEXL2TbdjgDE8bQz4CulRbSUqVEMCRa2GODqVayUw3saer8LUriKRSi8t'

const binancePriceApi = createApi({
  reducerPath: 'binancePrice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.binance.com/api/v3'
  }),
  tagTypes: [],
  endpoints: (builder) => {
    return {
      fetchAveragePrice: builder.query<ICoinAveragePrice, ICoinsPairQuery>({
        query: (coinPair) => ({
          url: '/avgPrice',
          params: {
            symbol: coinPair
          }
        })
      }),
      fetchLivePrice: builder.query<ICoinPrice[] | IPrice24SocketMessage , ISymbol[]>({
        query: (symbols) => {
          const coinPairs = symbols.map(symbol => symbol + 'USDT')
          return {
            url: '/ticker/24hr',
            params: {
              symbols: JSON.stringify(coinPairs)
            }
          }
        },
        async onCacheEntryAdded(symbols, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
          const subscriptions = symbols.map(symbol => symbol.toLowerCase() + 'usdt@ticker_1d')
          const ws = new WebSocket('wss://stream.binance.com:443/ws/btcusdt@icker_1d')
          const message = {
            "method": "SUBSCRIBE",
            "params": [
              ...subscriptions
            ],
            "id": 121343242
          }
          try {
            await cacheDataLoaded;
            ws.onopen = () => {
              ws.send(JSON.stringify(message))
            }
            const listener = (e: MessageEvent) => {
              const parsedData: IPrice24SocketMessage = JSON.parse(e.data);
              if (isPriceMessage(parsedData)) {
                updateCachedData(draft => {
                  return parsedData
                })
              }
            }
            ws.addEventListener('message', listener)
          } catch (e) {
            console.warn('WebSocket' + e)
          }
          await cacheEntryRemoved
          ws.close()
        }
      })
    }
  }
})


export const { useFetchAveragePriceQuery, useFetchLivePriceQuery} = binancePriceApi
export {binancePriceApi}