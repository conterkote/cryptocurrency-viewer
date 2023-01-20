import React from 'react';

export interface IConvertToModalProps {
  display : 'block' | 'hidden'
}

function ConvertToModal({display} : IConvertToModalProps) {
  return (
    <div className={`bg-gray-900/40 z-[2] left-1/2 top-1/2 w-full h-full flex items-center justify-center -translate-y-1/2 -translate-x-1/2 h-80 absolute bottom-0 ${display}`}>
    <div className={`w-1/2 grid h-1/2 bg-gray-900`}>

    </div>

    </div>
  );
}

export default ConvertToModal;