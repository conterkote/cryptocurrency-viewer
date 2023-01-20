import React, {useState} from 'react';

import {FaCaretDown} from "react-icons/fa";
import ConvertToModal from "./Modals/ConvertToModal";

function ConvertTo({}) {
  const currentCurrency = 'USD'
  const [display, setDisplay] = useState<'block' | 'hidden'>('block');
  return (
    <div
      className={`group px-2 rounded-lg cursor-pointer hover:bg-gray-900 text-[16px] text-white flex items-center justify-center relative`}>
      <p>{currentCurrency}</p>
      <img className={`ml-1 w-3 pb-0.5`} src={`https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/${currentCurrency}.svg`}/>
      <FaCaretDown className={`animate-bounce ml-0.5 hidden group-hover:block absolute -bottom-[18px]`} />
    </div>
  );
}

export default ConvertTo;