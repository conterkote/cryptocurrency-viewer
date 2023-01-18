import React from 'react';
import classes from './style/CurrencyChooseWrapper.module.css'
import CurrencyChoose from "./CurrencyChoose";

function CurrencyChooseWrapper({}) {
  return (
    <div className={`m-auto w-48 relative my-10 h-24`}>
      <div className={`${classes.glassMorphism} rounded-2xl`}>
        <CurrencyChoose />
        <div className={`${classes.holder} rounded-b-2xl text-[16px] text-white flex items-center justify-center`}>
          <p>Convert to</p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyChooseWrapper;