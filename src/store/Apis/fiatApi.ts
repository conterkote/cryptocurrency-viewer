import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUSDRatioResponse} from "../../models";

const fiatApi = createApi({
  reducerPath : 'fiatApi',
  baseQuery : fetchBaseQuery({
    baseUrl : 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest'
  }),
  endpoints(builder) {
    return {
      fetchUsdRatio : builder.query<IUSDRatioResponse, void>({
        query : () => ({
          url : '/currencies/usd.json',
        })
      })
    }
  }
});


export const { useFetchUsdRatioQuery } = fiatApi

export { fiatApi }