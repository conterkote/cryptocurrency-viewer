import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICoinStatsNewsResponse} from "../../models";

const coinStatsApi = createApi({
  reducerPath : 'coinStatsApi',
  baseQuery : fetchBaseQuery({
    baseUrl : 'https://api.coinstats.app/public'
  }),
  endpoints(builder) {
    return {
      fetchBearishNews : builder.query<ICoinStatsNewsResponse, void>({
        query : () => ({
          url : '/v1/news/bearish',
          params : {
            skip : 0,
            limit : 3,

          }
        })
      }),
      fetchBullishNews : builder.query<ICoinStatsNewsResponse, void>({
        query : () => ({
          url : '/v1/news/bullish',
          params : {
            skip : 0,
            limit : 3
          }
        })
      })
    }
    }
  }
)

export const { useFetchBullishNewsQuery, useFetchBearishNewsQuery } = coinStatsApi

export default coinStatsApi