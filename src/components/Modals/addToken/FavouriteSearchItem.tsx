import React from 'react';
import {ISymbol} from "../../../models";

interface TFavouriteSearchItemProps {
  name : string,
  symbol : ISymbol,
  marketRank : number,
  large : string,
  onClick : () => void
}

function FavouriteSearchItem({name, symbol, marketRank, large, onClick} : TFavouriteSearchItemProps) {
  return (
    <div onClick={onClick} className={`group cursor-pointer text-[14px] text-white my-1 first:my-0 last:my-0 w-full py-1 px-2 bg-dark-main/70 grid gap-y-2 grid-cols-[1fr_1fr_2fr_1fr]`}>
      <div className={`flex justify-center`}>
        <div className={`relative p-4 bg-white rounded-full`}>
          <img className={`rounded-full w-6 h-6 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`} src={large} alt={`404`}/>
        </div>
      </div>
      <div className={`grid items-center`}>
        <p>{symbol}</p>
      </div>
      <div className={`flex items-center`}>
        <p>{name}</p>
      </div>
      <div className={`grid items-center`}>
        <p>{marketRank ? `Rank: #${marketRank}` : `Unranked`}</p>
      </div>
    </div>
  );
}

export default FavouriteSearchItem;