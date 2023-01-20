import React from 'react';

export interface ICurrencyGroupProps {
  name : string,
  content : JSX.Element[]
}

function CurrencyGroup({name, content} : ICurrencyGroupProps) {
  return (
    <div className="popular-fait">
      <p className={"text-white/40 my-3 text-[14px]"}>{name}</p>
      <div className={`grid grid-cols-4 gap-x-2 gap-y-4`}>
        {content}
      </div>
    </div>
  );
}

export default CurrencyGroup;