import React, {useState} from 'react';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export interface ICoinTableHeaderItemProps {
  itemName : string
  align : 'start' | 'end' | 'center'
  className ?: string
}

function CoinTableHeaderItem({itemName, align, className} : ICoinTableHeaderItemProps) {
  const property = {

  }
  return (
    <div className={`select-none py-1 group first:cursor-default cursor-pointer flex items-center first:px-0 px-0.5 md:px-1.5 lg:px-2 justify-${align} border-l-dark-sub first:border-l-0 border-l-2 ` + className}>
      <div className="group-first-of-type:hidden px-0.5 md:px-1 lg:px-1.5">
        <FaAngleUp className={"text-[6px] md:text-[8px] lg:text-[10px]"}/>
        <FaAngleDown className={"text-[6px] md:text-[8px] lg:text-[10px]"} />
      </div>
      {itemName}
    </div>
  );
}

export default CoinTableHeaderItem;