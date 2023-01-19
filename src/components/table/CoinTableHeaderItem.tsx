import React, {useState} from 'react';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {useSelector} from "react-redux";
import {selectSortedKey, selectSortedOrder, updateOrder} from "../../store/Slices/coinsSlice";
import {useAppDispatch} from "../../store/store";

export interface CoinHeaderProperties {
  "Logo": "logo"
  "Name / Symbol": "symbol"
  "Symbol": "symbol"
  "Price": "lastPrice"
  "Change ($ / %)": "priceChangePercent"
  "Change": "priceChangePercent"
  "Volume 24hr": "quoteVolume"
}

export interface ICoinTableHeaderItemProps {
  itemName: keyof CoinHeaderProperties
  align: 'start' | 'end' | 'center'
  className?: string
}

function CoinTableHeaderItem({itemName, align, className}: ICoinTableHeaderItemProps) {
  const dispatch = useAppDispatch()
  const sortedKey = useSelector(selectSortedKey)
  const sortedOrder = useSelector(selectSortedOrder)
  const property: CoinHeaderProperties = {
    "Logo": "logo",
    "Name / Symbol": "symbol",
    "Symbol": "symbol",
    "Price": "lastPrice",
    "Change ($ / %)": "priceChangePercent",
    "Change": "priceChangePercent",
    "Volume 24hr": "quoteVolume",
  }

  const onClickHandle = () => {
    if (property[itemName] !== 'logo') dispatch(updateOrder(property[itemName]))
  }

  let content;

  if (sortedKey === property[itemName]) {
    content = (
      <>
        <div className="group-first-of-type:hidden px-0.5 md:px-1 lg:px-1.5">
          <FaAngleUp className={`${sortedOrder === 'ascn' && 'text-colorful-1'} text-[6px] md:text-[8px] lg:text-[10px]`}/>
          <FaAngleDown className={`${sortedOrder === 'desc' && 'text-colorful-1'} text-[6px] md:text-[8px] lg:text-[10px]`} />
        </div>
        {itemName}
      </>
    )
  } else {
    content = (
      <>
        <div className="group-first-of-type:hidden px-0.5 md:px-1 lg:px-1.5">
          <FaAngleUp className={`text-[6px] md:text-[8px] lg:text-[10px]`}/>
          <FaAngleDown className={`text-[6px] md:text-[8px] lg:text-[10px]`}/>
        </div>
        {itemName}
      </>
    )
  }

  return (
    <div onClick = {onClickHandle}
      className={`select-none py-1 group first:cursor-default cursor-pointer flex items-center first:px-0 px-0.5 md:px-1.5 lg:px-2 justify-${align} border-l-dark-sub first:border-l-0 border-l-2 ` + className}>
      {content}
    </div>

  );
}

export default CoinTableHeaderItem;