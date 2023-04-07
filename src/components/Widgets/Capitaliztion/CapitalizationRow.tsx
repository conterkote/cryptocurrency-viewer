import React from 'react';
import {IMarketCapPercentageWithLogos} from "../../../models";

interface ICapitalizationRowProps {
  capitalizationData: IMarketCapPercentageWithLogos
  index: number
}

function CapitalizationRow({capitalizationData, index}: ICapitalizationRowProps) {
  return (
    <>
      <div className={`flex justify-between`}>
        <p className={`text-[15px] text-white`}>{index + 1}</p>
        <img className={`w-6 rounded-full`}
             src={capitalizationData.logo}
             alt=""/>
      </div>
        <p className={`text-white`}>{capitalizationData.name}</p>
        <p className={`text-white`}>{capitalizationData.symbol.toUpperCase()}</p>
      <div className={`flex justify-end`}>
        <p
          className={`text-[15px] max-h-12 line-clamp-2 text-white`}>
          {capitalizationData.marketCapPercentage.toFixed(1)}%
        </p>
      </div>
    </>
  );
}

export default CapitalizationRow;