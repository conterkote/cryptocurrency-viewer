import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ISymbol} from "../../models";

export interface IFavouriteState {
  favouriteSymbols : ISymbol[]
}

const localFavourite = localStorage.getItem('CV_favouriteSymbols')

const initialState: IFavouriteState = {
  favouriteSymbols : localFavourite ? JSON.parse(localFavourite) : []
}

const favouriteSlice = createSlice({
  name : 'favourite',
  initialState,
  reducers : {
    addFavourite : (state, action) => {

    },
    removeFavourite : (state, action) => {

    }
  },
  extraReducers(builder){
  }
})

export const selectFavouriteSymbols = (state : RootState) => state.favourite.favouriteSymbols

export default favouriteSlice