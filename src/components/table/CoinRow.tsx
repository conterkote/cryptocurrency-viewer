import React from 'react';
import Decimal from "decimal.js";

export interface ICoinRowsProps {
  symbol: string,
  name: string,
  icon: string,
  lastPrice: string,
  priceChangePercent: string,
  quoteVolume : string,
  priceChange : string,
  currencyRatio : number,
  currentCurrency : string
}

import {FaCaretDown, FaCaretUp} from 'react-icons/fa'

function CoinRow({symbol, name, icon, lastPrice, priceChangePercent, priceChange, quoteVolume, currencyRatio, currentCurrency}: ICoinRowsProps) {
  Decimal.set({
    precision : 9
  })
  const lastPriceDecimal = new Decimal(lastPrice).mul(currencyRatio)
  const volumeDecimal = new Decimal(quoteVolume).div(1000000).mul(currencyRatio)
  const priceChangePercentDecimal = new Decimal(priceChangePercent).mul(currencyRatio)
  const priceChangeDecimal = new Decimal(priceChange);
  const preparedLastPrice = lastPriceDecimal.toString()
  const preparedVolume = volumeDecimal.toString()
  const preparedPriceChange = priceChangeDecimal.toString().replace(/-/, '');
  const isNegative = priceChangePercentDecimal.isNegative()
  return (
    <div
      className={`text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] border-opacity-10 border-y-2 border-y-dark-sub group
      hover:border-opacity-50 grid grid-cols-[0.35fr_0.5fr_0.7fr_0.7fr_0.7fr_1fr]
      md:grid-cols-[0.35fr_1fr_0.7fr_0.7fr_0.7fr_1fr_2fr] h-10 md:h-14 lg:h-16 xl:h-18 2xl:h-20
      text-white`}>
      <div className="flex items-center justify-center group-hover:border-opacity-50 border-opacity-10">
        <img src={icon} alt="404" className="rounded-full w-[16px] h-[16px] md:w-[20px] md:h-[20px] lg:h-8 lg:w-8 m-auto">
        </img>
      </div>
      <div className="flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub content-start">
        <p className="mr-4 hidden lg:block">{name}</p>
        <p>{symbol}</p>
      </div>
      <div className="flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-start">
        {currentCurrency}{preparedLastPrice}
      </div>
      <div className={`flex items-center px-0.5 md:px-1 lg:px-2 justify-end group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub`}>
        {currentCurrency}{preparedPriceChange}

      </div>
      <div className={`flex items-center px-0.5 md:px-1 lg:px-2 justify-start ${isNegative ? 'text-red-500' : 'text-green-500'} group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub`}>
        {priceChangePercent}%
        {isNegative ? <FaCaretDown size={16} className={"pb-0.5"} /> : <FaCaretUp size={16} className={"pb-0.5"} />}
      </div>
      <div className={`scrollbar-thin scrollbar-thumb-indigo-50 overflow-x-scroll flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-start`}>
        {currentCurrency}{preparedVolume}M
      </div>
      <div className={`hidden md:flex items-center group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-center`}>
        Details
      </div>
    </div>
  );
}

export default CoinRow;