import React from 'react';

function PriceSkeleton() {
  return (
      <span className="animate-pulse flex space-x-4 inline">
        <span className="rounded-full bg-slate-700 h-4 w-24"></span>
      </span>
  );
}

export default PriceSkeleton;