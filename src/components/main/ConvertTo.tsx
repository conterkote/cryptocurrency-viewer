import React, {useState} from 'react';

import {FaCaretDown} from "react-icons/fa";
import ConvertToModal from "../Modals/ConvertTo/ConvertToModal";
import {useFetchUsdRatioQuery} from "../../store/Apis/fiatApi";
import {useAppDispatch} from "../../store/store";
import {selectCurrentCurrency, switchModalState} from "../../store/Slices/convertSlice";
import {useSelector} from "react-redux";

function ConvertTo({}) {
  useFetchUsdRatioQuery()
  const currentCurrency = useSelector(selectCurrentCurrency)
  const dispatch = useAppDispatch()
  const onClickHandle = () => dispatch(switchModalState())

  return (
    <div onClick={onClickHandle}
      className={`group px-2 rounded-lg cursor-pointer hover:bg-gray-900 text-[16px] text-white flex items-center justify-center relative`}>
      <p>{currentCurrency}</p>
      <img className={`ml-1 w-3 pb-0.5`} src={`https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/${currentCurrency}.svg`}/>
      <FaCaretDown className={`animate-bounce ml-0.5 hidden group-hover:block absolute -bottom-[18px]`} />
    </div>
  );
}

export default ConvertTo;