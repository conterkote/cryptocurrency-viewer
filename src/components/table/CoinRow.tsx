import React from 'react';
import Decimal from "decimal.js";

export interface ICoinRowsProps {
  symbol: string,
  name: string,
  icon: string,
  lastPrice: string,
  priceChangePercent: string,
}

function CoinRow({symbol, name, icon, lastPrice, priceChangePercent}: ICoinRowsProps) {
  const price = new Decimal(lastPrice)
  const preparedString = price.toString()
  return (
    <div className={`border-opacity-10 border-y-2 border-y-dark-sub group hover:border-opacity-50 h-20 grid grid-cols-[0.20fr_1.5fr_1fr_1fr] h-[80] text-white`}>
      <div className="flex items-center justify-center group-hover:border-opacity-50 border-opacity-10 border-r-2 border-r-dark-sub">
        <img src={icon} alt="404" className="rounded-full w-8 h-8 m-auto">
        </img>
      </div>
      <div className="flex items-center group-hover:border-opacity-50 border-opacity-10 border-r-2 border-r-dark-sub content-start ml-6">
        <p className="mr-4">{name}</p>
        <p>{symbol}</p>
      </div>
      <div className="flex items-center px-4 group-hover:border-opacity-50 border-opacity-10 border-r-2 border-r-dark-sub justify-start">${preparedString}</div>
      <div className="flex items-center group-hover:border-opacity-50 border-opacity-10 border-r-2 border-r-dark-sub justify-center">{priceChangePercent}</div>
    </div>
  );
}

export default CoinRow;