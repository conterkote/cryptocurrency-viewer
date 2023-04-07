import React from 'react';
import {GiMuscleUp} from "react-icons/all";
import {
  ICoinGeckoGlobalData, ICoinGeckoGlobalResponse,
  IMarketCapPercentageWithLogos,
} from "../../../models";
import {useSelector} from "react-redux";
import {selectCoinIcon} from "../../../store/Slices/coinSync";
import CapitalizationRow from "./CapitalizationRow";

function syncCapitalizationCoins(globalData : ICoinGeckoGlobalData | undefined): IMarketCapPercentageWithLogos[] {
  const hashMap = useSelector(selectCoinIcon);
  let result: IMarketCapPercentageWithLogos[] = [];

  if (globalData && hashMap) {
    result = Object.entries(globalData.market_cap_percentage)
      .sort(([, aPercentage], [, bPercentage]) => {
        return aPercentage + bPercentage;
      })
      .map(([symbol, marketCapPercentage]) => {
        return {
          symbol,
          marketCapPercentage,
          logo: hashMap[symbol.toUpperCase()]?.large,
          name: hashMap[symbol.toUpperCase()]?.name
        };
      })
    result.length = 3
  }
  return result
}

interface ICapitalizationMainWidgetProps {
  dominanceData : ICoinGeckoGlobalResponse | undefined
}

function CapitalizationMainWidget({dominanceData} : ICapitalizationMainWidgetProps) {
  let dominanceWithLogos = syncCapitalizationCoins(dominanceData?.data)
  let dominanceRendered = dominanceWithLogos.map(
    (data, index) =>
      (<CapitalizationRow key={data.symbol} capitalizationData={data} index={index} />)
  )
  return (
    <div className={`widget-container`}>
      <div className={`grid grid-cols-[1fr_5fr_1fr_2fr] min-h-[199px] grid-rows-3 bg-gradient-to-br from-dark-main/70 to-dark-sub rounded-t-2xl items-center gap-x-3 gap-y-4 py-4 px-6`}>
        {dominanceRendered}
      </div>
      <div className={`h-12 flex items-center rounded-b-2xl bg-gradient-to-r from-dark-main to-dark-main/70`}>
        <div className={`pl-6 pr-2`}>
          <GiMuscleUp color={`#dcc397`} className={`-translate-y-[2px]`} size={20}/>
        </div>
        <p className={`text-[16px] text-white`}>
          Market dominance
        </p>
      </div>
    </div>
  );
}

export default CapitalizationMainWidget;