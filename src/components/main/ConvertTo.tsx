import React, {CSSProperties} from 'react';

function ConvertTo({}) {
  return (
    <div
      className={`py-1 rounded-b-2xl text-[16px] text-white flex items-center justify-center`}>
      <p>RUB</p>
      <img className={`w-3 ml-0.5 pb-0.5`} src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/RUB.svg"/>
    </div>
  );
}

export default ConvertTo;