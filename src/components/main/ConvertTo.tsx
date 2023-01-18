import React, {CSSProperties} from 'react';

function ConvertTo({}) {
  const style = {background: 'linear-gradient(117deg, rgba(23,23,26,1) 100%, rgba(27,29,37,1) 100%)'} as CSSProperties
  return (
    <div style={style}
         className={`w-48 py-1 m-auto rounded-b-2xl text-[16px] text-white flex items-center justify-center`}>
      <p>Convert to</p>
    </div>
  );
}

export default ConvertTo;