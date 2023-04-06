import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ISymbol} from "../../models";
import {toast} from "react-toastify";

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
    addFavourite : (state, {payload}) => {
      const currentSubscriptionsStringified = localStorage.getItem('CV_favouriteSymbols')
      if (!currentSubscriptionsStringified) {
        localStorage.setItem('CV_favouriteSymbols', JSON.stringify([payload]))
      } else {
        const currentSubscriptions = JSON.parse(currentSubscriptionsStringified)
        if (!currentSubscriptions.includes(payload)) {
          localStorage.setItem('CV_favouriteSymbols', JSON.stringify([...currentSubscriptions, payload]))
        } else {
          toast.error('This coin is already in favourite!',  {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        }
      }
      const newState = localStorage.getItem('CV_favouriteSymbols')
      return {
        favouriteSymbols : newState ? JSON.parse(newState) : []
      }
    },
    // removeFavourite : (state, action) => {
    //
    // }
  }
})

export const {addFavourite} = favouriteSlice.actions
export const selectFavouriteSymbols = (state : RootState) => state.favourite.favouriteSymbols
export default favouriteSlice