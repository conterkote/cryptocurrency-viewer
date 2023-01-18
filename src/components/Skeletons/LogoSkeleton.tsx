import React from 'react';

function LogoSkeleton() {
  return (
    <span className="animate-pulse flex space-x-4 inline">
        <span className="rounded-full bg-slate-700 h-8 w-8" />
    </span>
  );
}

export default LogoSkeleton;