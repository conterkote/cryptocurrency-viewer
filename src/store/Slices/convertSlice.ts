import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentCurrency : 'BTC'
}

const convertSlice = createSlice({
  name : 'convert',
  initialState,
  reducers : {
    updateCurrency : (state, { payload }) => {

    }
  }
})