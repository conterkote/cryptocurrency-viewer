import React from 'react';
import {selectCoinIcon} from "../../../store/Slices/coinSync";
import {useSelector} from "react-redux";
import {ICoinStatsNewsResponse, INews, INewsWithLogos} from "../../../models";
import NewsRow from "./NewsRow";

interface INewsMainWidgetProps {
  newsData : ICoinStatsNewsResponse | undefined
  newsType : {
    name : string
    icon : JSX.Element
  }
}

function syncNewsCoins(news : INews[] | undefined): INewsWithLogos[] {
  const hashMap = useSelector(selectCoinIcon);
  let result: INewsWithLogos[] = [];

  if (news && hashMap) {
    result = news.map(newsData => {
      return {
        ...newsData,
        coins : newsData.coins.map(coin => {
          return {
            ...coin,
            large : hashMap[coin.coinKeyWords]?.large
          }
        }),
      }
    })
  }

  return result
}

function NewsMainWidget({newsData, newsType} : INewsMainWidgetProps) {
  const newsWithLogos = syncNewsCoins(newsData?.news)
  const newsRendered = newsWithLogos.map((news, index) => <NewsRow key={news.id} index={index} news={news}/>)
  return (
    <div className={`widget-container`}>
      <div className={`grid min-h-[199px] grid-rows-3 bg-gradient-to-br from-dark-main/70 to-dark-sub rounded-t-2xl items-center grid-cols-[1fr_6fr_2fr] gap-x-3 gap-y-4 py-4 px-6`}>
        {newsRendered}
      </div>
      <div className={`h-12 flex rounded-b-2xl bg-gradient-to-r from-dark-main to-dark-main/70 items-center`}>
        <div className={`pl-6 pr-2`}>
          {newsType.icon}
        </div>
        <p className={`text-[16px] text-white`}>{newsType.name}</p>
      </div>
    </div>
  );
}

export default NewsMainWidget;