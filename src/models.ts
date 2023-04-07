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

export type IFiatSymbol = string;

export type IUSDRatio = Record<IFiatSymbol, number>

export interface IUSDRatioResponse {
  date: string;
  usd: IUSDRatio;
}

export interface IConvertSliceState {
  currentCurrency : string
  currentRatioToUsd : Record<IFiatSymbol, number>,
  popularFiats: fiatPair
  allFiats: fiatPair
  modalState : 'hidden' | 'block'
}

type fiatPair = Record<IFiatSymbol, IFiatInfo>

export interface IFiatInfo {
  currencySymbol : IFiatSymbol
  currencyName : string
}

export interface IFiatConvertData {
  currentSymbol : IFiatSymbol,
  currentRatioToUsd : number,
}

export type ILogosData = Pick<ICoinLogo, 'large' | 'name'>

export interface ICoinStatsNewsResponse {
  news: INews[];
}

export interface INews {
  id:             string;
  feedDate:       number;
  source:         string;
  title:          string;
  icon:           string;
  imgURL:         string;
  description:    string;
  link:           string;
  sourceLink:     string;
  reactionsCount: { [key: string]: number };
  shareURL:       string;
  relatedCoins:   string[];
  content:        boolean;
  coins:          ICoinsNewsChange[];
}

export interface ICoinsNewsChange {
  coinKeyWords:      string;
  coinPercent:       number;
  coinTitleKeyWords: string;
  coinNameKeyWords:  string;
  coinIdKeyWords:    string;
}

export interface INewsWithLogos extends INews {
  id:             string;
  feedDate:       number;
  source:         string;
  title:          string;
  icon:           string;
  imgURL:         string;
  description:    string;
  link:           string;
  sourceLink:     string;
  reactionsCount: { [key: string]: number };
  shareURL:       string;
  relatedCoins:   string[];
  content:        boolean;
  coins:         ICoinsNewsChangeWithLogos[];
}

export interface ICoinsNewsChangeWithLogos extends ICoinsNewsChange{
  coinKeyWords:      string;
  coinPercent:       number;
  coinTitleKeyWords: string;
  coinNameKeyWords:  string;
  coinIdKeyWords:    string;
  large ?: string
}

export interface ICoinGeckoGlobalResponse {
  data: ICoinGeckoGlobalData;
}

export interface ICoinGeckoGlobalData {
  active_cryptocurrencies:              number;
  upcoming_icos:                        number;
  ongoing_icos:                         number;
  ended_icos:                           number;
  markets:                              number;
  total_market_cap:                     { [key: string]: number };
  total_volume:                         { [key: string]: number };
  market_cap_percentage:                { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  updated_at:                           number;
}

export interface IMarketCapPercentageWithLogos {
  symbol : string,
  logo ?: string,
  name ?: string,
  marketCapPercentage : number
}

