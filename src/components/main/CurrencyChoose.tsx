import React, { useState} from 'react';
import {useFetchCoinQuery} from "../../store/Apis/logosApi";
import {useFetchAveragePriceQuery } from "../../store/Apis/binancePriceApi";
import PriceSkeleton from "../Skeletons/PriceSkeleton";
import LogoSkeleton from "../Skeletons/LogoSkeleton";
import Logo from "./Logo";

export interface ICurrencyChooseProps {
  coinSrc: string
}

function CurrencyChoose() {
  const [currentCurrency, setCurrentCurrency] = useState<string>('BNB');
  const coinLogoResults = useFetchCoinQuery(currentCurrency)
  const averagePriceResults = useFetchAveragePriceQuery(`${currentCurrency}USDT`, {skip : currentCurrency === 'USDT'})

  let currentLogo;
  if ( coinLogoResults.isLoading || coinLogoResults.isFetching )
    currentLogo = <LogoSkeleton />
  else if (coinLogoResults.data && !coinLogoResults.isFetching)
    currentLogo = <Logo src={coinLogoResults.data.coins[0].large as string} />

  let currentAvgPrice;
  if ( averagePriceResults.isLoading || averagePriceResults.isFetching )
    currentAvgPrice = <PriceSkeleton />
  else if ( averagePriceResults.data && !averagePriceResults.isFetching )
    currentAvgPrice = averagePriceResults.data.price

  return (
    <div className="w-full -translate-y-[28px] absolute top-1/2 flex items-center justify-center">
      { currentLogo }
      <p className="text-[14px] text-white flex items-center font-light">
        <span className="mx-2">≈</span>
        {currentCurrency === 'USDT' ? 1 : currentAvgPrice} $
      </p>
    </div>
  );
}

export default CurrencyChoose;