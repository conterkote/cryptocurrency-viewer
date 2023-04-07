import React from 'react';

interface IWidgetSkeletonProps {
  icon : JSX.Element
  widgetName : string
}
function WidgetSkeleton({icon, widgetName} : IWidgetSkeletonProps) {
  return (
    <div>
      <div className={`h-[199px] animate-pulse grid grid-rows-3 gap-x-3 gap-y-6 py-4 px-6 w-full bg-gradient-to-br from-dark-main/70 to-dark-sub rounded-t-2xl`}>
        <div className={`bg-slate-700 rounded-full`}></div>
        <div className={`bg-slate-700 rounded-full`}></div>
        <div className={`bg-slate-700 rounded-full`}></div>
      </div>
      <div className={`h-12 flex items-center rounded-b-2xl bg-gradient-to-r from-dark-main to-dark-main/70`}>
        <div className={`pl-6 pr-2`}>
          {icon}
        </div>
        <p className={`text-[16px] text-white`}>
          {widgetName}
        </p>
      </div>
    </div>
  );
}

export default WidgetSkeleton;