import React from 'react';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'
import CoinTableHeaderItem from "./CoinTableHeaderItem";
function CoinTableHeader({}) {
  return (
    <div className={`border-y-dark-sub text-[10px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
    grid grid-cols-[0.35fr_0.5fr_0.7fr_1.4fr_1fr] 
    md:grid-cols-[0.35fr_1fr_0.7fr_1.4fr_1fr_2fr] text-white`}>
      <CoinTableHeaderItem itemName={"Logo"} align={'center'}/>
      <CoinTableHeaderItem itemName={"Name / Symbol"} align={'start'} className={'hidden lg:flex'}/>
      <CoinTableHeaderItem itemName={"Symbol"} align={'start'} className={'flex lg:hidden'}/>
      <CoinTableHeaderItem itemName={"Price"} align={'start'}/>
      <CoinTableHeaderItem itemName={"Change ($ / %)"} align={'center'} className={'hidden lg:flex'}/>
      <CoinTableHeaderItem itemName={"Change"} align={'center'} className={'block lg:hidden'}/>
      <CoinTableHeaderItem itemName={"Volume 24hr"} align={'start'}/>
      <div className="py-1 hidden md:block px-4 border-l-dark-sub border-l-2"></div>
    </div>
  );
}

export default CoinTableHeader;