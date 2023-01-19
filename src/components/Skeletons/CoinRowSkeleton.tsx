import React from 'react';
import TextSkeleton from "./TextSkeleton";
import LogoSkeleton from "./LogoSkeleton";

function CoinRowSkeleton() {
  return (
    <div
      className={`text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] border-opacity-10 border-y-2 border-y-dark-sub group
      hover:border-opacity-50 grid grid-cols-[0.35fr_0.5fr_0.7fr_0.7fr_0.7fr_1fr]
      md:grid-cols-[0.35fr_1fr_0.7fr_0.7fr_0.7fr_1fr_2fr] h-10 md:h-14 lg:h-16 xl:h-18 2xl:h-20
      text-white`}>
      <div className="flex items-center justify-center group-hover:border-opacity-50 border-opacity-10">
        <LogoSkeleton />
      </div>
      <div className="flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub content-start">
        <div className="mr-4 hidden flex lg:block">
          <TextSkeleton width={'m'} />
        </div>
        <div>
          <TextSkeleton width={'s'} />
        </div>
      </div>
      <div className="flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-start">
        <TextSkeleton width={'m'} />
      </div>
      <div className={`flex items-center px-0.5 md:px-1 lg:px-2 justify-end group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub`}>
        <TextSkeleton width={'m'} />

      </div>
      <div className={`flex items-center px-0.5 md:px-1 lg:px-2 justify-start group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub`}>
        <TextSkeleton width={'m'} />
      </div>
      <div className={`scrollbar-thin scrollbar-thumb-indigo-50 overflow-x-scroll flex items-center px-0.5 md:px-1 lg:px-2 group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-start`}>
        <TextSkeleton width={'xl'} />
      </div>
      <div className={`hidden md:flex items-center group-hover:border-opacity-50 border-opacity-10 border-l-2 border-l-dark-sub justify-center`}>
        Details
      </div>
    </div>
  );
}

export default CoinRowSkeleton;