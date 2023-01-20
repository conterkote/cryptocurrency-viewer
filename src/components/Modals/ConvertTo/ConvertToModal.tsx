import React, {useEffect, useRef} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useAppDispatch} from "../../../store/store";
import {selectAllFiat, selectPopularFiat, updateCurrency} from "../../../store/Slices/convertSlice";
import {useOutsideClick} from "../../../customHooks/useOutsideClick";
import {useSelector} from "react-redux";
import CurrencyGroup from "./currencyGroup";
import {IFiatInfo, IFiatSymbol} from "../../../models";

function ConvertToModal() {
  const dispatch = useAppDispatch()
  const ref = useRef<null | HTMLDivElement>(null)
  useOutsideClick(ref, dispatch)

  const allFiats = useSelector(selectAllFiat)
  const popularFiats = useSelector(selectPopularFiat)

  const onChooseCurrency = (currencySymbol : IFiatSymbol): void => {
    dispatch(updateCurrency(currencySymbol))
  }

  const renderFiat = ([fiat, fiatInfo]: [string, IFiatInfo]) =>
    (<div key={fiat}
          onClick={() => onChooseCurrency(fiat.toUpperCase())}
          className={`flex px-2 rounded-xl cursor-pointer group hover:bg-white/20 items-center text-white text-[14px]`}>
      <img className={"w-4 mr-2"} src={`https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/${fiat}.svg`}
           alt={"404"}/>
      <div className={`flex flex-col`}>
        <p>{fiatInfo.currencyName}</p>
        <p>{fiat} - {fiatInfo.currencySymbol}</p>
      </div>
    </div>)

  const popularFiatContent = Object.entries(popularFiats).map(renderFiat)
  const allFiatContent = Object.entries(allFiats).map(renderFiat)

  return (
    <div
      className={`bg-gray-900/40 z-[2] left-1/2 top-1/2 w-full h-full flex items-center justify-center -translate-y-1/2 -translate-x-1/2 absolute bottom-0 block`}>
      <div ref={ref}
        className={`w-[800px] grid grid-rows-[1fr_auto] h-[600px] rounded-3xl bg-dark-sub box-border p-6`}>
        <div>
          <h3 className={"text-white text-2xl"}>Select Currency</h3>
          <input className={
            `border w-full rounded-lg bg-white/10 my-4 px-3 py-1 text-white border-dark-main/50 hover:border-colorful-1/80 focus:outline-none 
          focus:border-colorful-1`}/>
        </div>
        <div className={`overflow-y-scroll w-full scrollbar-none`}>
          <CurrencyGroup name={'Popular fiat currencies'} content={popularFiatContent}/>
          <CurrencyGroup name={'Fiat currencies'} content={allFiatContent}/>
        </div>
      </div>

    </div>
  );
}

export default ConvertToModal;