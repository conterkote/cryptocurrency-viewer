import React from 'react';
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {INewsWithLogos} from "../../../models";

interface INewsRowProps {
  news : INewsWithLogos,
  index : number
}
function NewsRow({news, index} : INewsRowProps) {
  const coinsMarketMove = news.coins.map(coin => (
    <div key={coin.coinKeyWords} className={`relative flex justify-center`}>
      {
        coin.coinPercent > 0 ?
          <FaCaretUp size={18} className={`absolute text-green-500 -translate-x-1/2 left-1/2 -top-4`} />
          : <FaCaretDown size={18} className={`absolute text-red-500 -translate-x-1/2 left-1/2 -bottom-4`}/>
      }
      <img className={`w-6 rounded-full`}
           src={coin.large} alt=""/>
    </div>
  ))
  return (
    <>
      <div className={`flex justify-between`}>
        <p className={`text-[15px] text-white`}>{index + 1}</p>
        <img className={`w-6 rounded-full`}
             onError={({currentTarget}) => {
               currentTarget.onerror = null;
               currentTarget.src = 'https://media.licdn.com/dms/image/C4D0BAQFH_APi5nsGVg/company-logo_200_200/0/1556095534803?e=2147483647&v=beta&t=Uv6LXPMSRvnY4PDe2Ivm3g-s24o4dU9upQJKWuV5Ygk';
             }}
             src={news.icon}
             alt=""/>
      </div>
      <a href={news.link} target={`_blank`} className={`text-[15px] max-h-12 line-clamp-2 text-white underline underline-offset-4 decoration-white/40`}>{news.title}</a>
      <div className={`grid grid-cols-3`}>
        {coinsMarketMove}
      </div>
    </>
  );
}

export default NewsRow;