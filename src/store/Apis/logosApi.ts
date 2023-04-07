import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICoinGeckoGlobalResponse, IFetchLogosResponse, IQueryString} from "../../models";

const logosApi = createApi({
  reducerPath: 'logos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api',
  }),
  endpoints: (builder) => {
    return {
      fetchCoin: builder.query<IFetchLogosResponse, IQueryString>({
        query: (query) => {
          return {
            url: `/v3/search?query=${query}`,
            method: 'GET',
          }
        }
      }),
      fetchGlobalData : builder.query<ICoinGeckoGlobalResponse, void>({
        query : () => {
          return {
            url : '/v3/global',
            method : 'GET'
          }
        }
      }),
      fetchLogos : builder.query<IFetchLogosResponse, null>({
        query : () => {
          return {
            url : '/v3/search/',
            method : 'GET'
          }
        },
      })
    }
  }
})

export const { useFetchCoinQuery, useFetchLogosQuery, useFetchGlobalDataQuery } = logosApi
export {logosApi}