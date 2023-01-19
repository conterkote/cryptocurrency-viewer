import {ThunkDispatch} from "@reduxjs/toolkit";
import {MaybePromise} from "@reduxjs/toolkit/dist/query/tsHelpers";

export type IQueryString = string

export interface ITableProps {
  data: any,
  rows ?: string[]
}

export interface IHeaderProps {
  name : string
}

export interface ICoinRowProps {
  coinData : any
}

export type ICoinsPairQuery = string

export interface ICoin24Data {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface ICoinAveragePrice {
  mins : number,
  price : string
}

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
  > = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export interface BaseQueryApi {
  signal: AbortSignal
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
}

export type ISymbol = string
export type IWebsocketQuery = string

export interface ICoinPrice {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: any;
  closeTime: any;
  firstId: number;
  lastId: number;
  count: number;
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
  error: E
  data?: undefined
  meta?: M
}
  | {
  error?: undefined
  data: T
  meta?: M
}


export interface IFetchLogosResponse {
  coins: ICoinLogo[];
}

export interface IPrice24SocketMessage {
  "e": string;    // Event type
  "E": number;    // Event time
  "s": string;    // Symbol
  "p": string;    // Price change
  "P": string;    // Price change percent
  "o": string;    // Open price
  "h": string;    // High price
  "l": string;    // Low price
  "c": string;    // Last price
  "w": string;    // Weighted average price
  "v": string;    // Total traded base asset quoteVolume
  "q": string;    // Total traded quote asset quoteVolume
  "O": number;    // Statistics open time
  "C": number;    // Statistics close time
  "F": number;    // First trade ID
  "L": number;    // Last trade Id
  "n": number;    // Total number of trades
}

export interface ICoinSyncedData {
  [key : string] : string
  name : string
  symbol : string;
  large: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume : string
}

export interface ICoinLogo {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  slug: string;
  score: number;
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

export interface ICoinSliceState {
  symbols: ISymbol[],
  coins: ICoinSyncedData[]
  sortConfig: {
    sortOrder: 'ascn' | 'desc',
    sortKey: keyof ICoinSyncedData
  }
}