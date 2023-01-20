import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentCurrency: 'USD',
  ratioToUsd : 1
}

const convertModalSlice = createSlice({
  initialState,
  name : 'convertModal',
  reducers : {
  }
})