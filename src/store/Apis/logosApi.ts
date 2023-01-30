import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFetchLogosResponse, IQueryString, ISymbol} from "../../models";

const logosApi = createApi({
  reducerPath: 'logos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
  }),
  endpoints: (builder) => {
    return {
      fetchCoin: builder.query<IFetchLogosResponse, IQueryString>({
        query: (query) => {
          return {
            url: `/search?query=${query}`,
            method: 'GET',
          }
        }
      }),
      fetchLogos : builder.query<IFetchLogosResponse, null>({
        query : () => {
          return {
            url : '/search/',
            method : 'GET'
          }
        },
      })
    }
  }
})

export const { useFetchCoinQuery, useFetchLogosQuery } = logosApi
export {logosApi}