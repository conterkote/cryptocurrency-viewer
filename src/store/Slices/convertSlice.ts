import {createSlice} from "@reduxjs/toolkit";
import {fiatApi} from "../Apis/fiatApi";
import {IConvertSliceState, IFiatConvertData} from "../../models";
import {RootState} from "../store";




const initialState: IConvertSliceState = {
  currentCurrency : 'RUB',
  currentRatioToUsd : {

  },
  popularFiats : {
    'USD': {currencySymbol : '$', currencyName : 'United States Dollar'},
    'EUR': {currencySymbol : '€', currencyName : 'Euro'},
    'GBP': {currencySymbol : '£', currencyName : 'Pound Sterling'},
    'RUB': {currencySymbol : '₽', currencyName : 'Russian Ruble'},
    'UAH': {currencySymbol : 'UAH', currencyName : 'Ukrainian Hryvnia'},
  },
  allFiats : {
    'USD': {currencySymbol : '$', currencyName : 'United States Dollar'},
    'AUD': {currencySymbol : '$', currencyName : 'Australian Dollar'},
    'BRL': {currencySymbol : 'R$', currencyName : 'Brazilian Real'},
    'CAD': {currencySymbol : '$', currencyName : 'Canadian Dollar'},
    'CHF': {currencySymbol : 'FR', currencyName : 'Swiss Franc'},
    'CLP': {currencySymbol : '$', currencyName : 'Chilean Peso'},
    'CNY': {currencySymbol : '¥', currencyName : 'Chinese Yuan'},
    'CZK': {currencySymbol : 'KČ', currencyName : 'Czech Koruna'},
    'DKK': {currencySymbol : 'KR', currencyName : 'Danish Krone'},
    'EUR': {currencySymbol : '€', currencyName : 'Euro'},
    'GBP': {currencySymbol : '£', currencyName : 'Pound Sterling'},
    'HKD': {currencySymbol : '$', currencyName : 'Hong Kong Dollar'},
    'HUF': {currencySymbol : 'FT', currencyName : 'Hungarian Forint'},
    'IDR': {currencySymbol : 'RP', currencyName : 'Indonesian Rupiah'},
    'ILS': {currencySymbol : '₪', currencyName : 'Israeli New Shekel'},
    'INR': {currencySymbol : '₹', currencyName : 'Indian Rupee'},
    'JPY': {currencySymbol : '¥', currencyName : 'Japanese Yen'},
    'KRW': {currencySymbol : '₩', currencyName : 'South Korean Won'},
    'MXN': {currencySymbol : '$', currencyName : 'Mexican Peso'},
    'MYR': {currencySymbol : 'RM', currencyName : 'Malaysian Ringgit'},
    'NOK': {currencySymbol : 'KR', currencyName : 'Norwegian Krone'},
    'NZD': {currencySymbol : '$', currencyName : 'New Zealand Dollar'},
    'PHP': {currencySymbol : '₱', currencyName : 'Philippine Peso'},
    'PKR': {currencySymbol : '₨', currencyName : 'Pakistani Rupee'},
    'PLN': {currencySymbol : 'ZŁ', currencyName : 'Polish Złoty'},
    'RUB': {currencySymbol : '₽', currencyName : 'Russian Ruble'},
    'SEK': {currencySymbol : 'KR', currencyName : 'Swedish Krona'},
    'SGD': {currencySymbol : 'S$', currencyName : 'Singapore Dollar'},
    'THB': {currencySymbol : '฿', currencyName : 'Thai Baht'},
    'TRY': {currencySymbol : '₺', currencyName : 'Turkish Lira'},
    'TWD': {currencySymbol : 'NT$', currencyName : 'New Taiwan Dollar'},
    'ZAR': {currencySymbol : 'R', currencyName : 'South African Rand'},
    'VND': {currencySymbol : '₫', currencyName : 'Vietnamese Dong'},
    'MAD': {currencySymbol : 'MAD', currencyName : 'Moroccan Dirham'},
    'IRR': {currencySymbol : 'IRR', currencyName : 'Iranian Rial'},
    'ARS': {currencySymbol : 'ARS', currencyName : 'Argentine Peso'},
    'RON': {currencySymbol : 'RON', currencyName : 'Romanian Leu'},
    'UAH': {currencySymbol : 'UAH', currencyName : 'Ukrainian Hryvnia'},
    'NGN': {currencySymbol : 'NGN', currencyName : 'Nigerian Naira'},
    'AED': {currencySymbol : 'AED', currencyName : 'United Arab Eirates Dirham'},
    'COP': {currencySymbol : 'COP', currencyName : 'Colombian Peso'},
    'EGP': {currencySymbol : 'EGP', currencyName : 'Egyptian Pound'},
    'SAR': {currencySymbol : 'SAR', currencyName : 'Saudi Riyal'},
    'BDT': {currencySymbol : 'BDT', currencyName : 'Bangladeshi Taka'},
    'GHS': {currencySymbol : 'GHS', currencyName : 'Ghanaian Cedi'},
    'BGN': {currencySymbol : 'BGN', currencyName : 'Bulgarian Lev'},
    'VES': {currencySymbol : 'VES', currencyName : 'Sovereign Boliva'},
  },
  modalState : 'hidden' // 'block'
}

const convertSlice = createSlice({
  name : 'convert',
  initialState,
  reducers : {
    updateCurrency : (state, { payload }) => {
      const newCurrency = payload.toUpperCase()
      return {
        currentCurrency : newCurrency,
        currentRatioToUsd : state.currentRatioToUsd,
        modalState : state.modalState,
        popularFiats : state.popularFiats,
        allFiats : state.allFiats,
      }
    },
    switchModalState : (state) => {
      state.modalState = state.modalState === 'hidden' ? 'block' : 'hidden'
    }
  },
  extraReducers(builder) {
    builder.addMatcher(fiatApi.endpoints.fetchUsdRatio.matchFulfilled, (state, {payload}) => {
      state.currentRatioToUsd = payload.usd;
    })
  }
})

export const selectFiatConvertData = (state : RootState): IFiatConvertData => {
  return {
    currentRatioToUsd : state.convert.currentRatioToUsd[state.convert.currentCurrency.toLowerCase()],
    currentSymbol : state.convert.allFiats[state.convert.currentCurrency].currencySymbol
  }
}

export const selectCurrentCurrency = (state : RootState) =>
  state.convert.currentCurrency

export const selectModalState = (state: RootState) => state.convert.modalState
export const selectAllFiat = (state : RootState) => state.convert.allFiats;
export const selectPopularFiat = (state : RootState) => state.convert.popularFiats;

export const { switchModalState, updateCurrency } = convertSlice.actions

export default convertSlice