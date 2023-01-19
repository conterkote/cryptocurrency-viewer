import React from 'react';

export interface ITextSkeletonProps {
  width : 's' | 'm' | 'l' | 'xl';
}

function TextSkeleton({ width } : ITextSkeletonProps) {
  const widthClasses = {
    's' : 'w-8',
    'm' : 'w-16',
    'l' : 'w-24',
    'xl' : 'w-32',
  }
  let content = (<div className="animate-pulse flex space-x-4 block">
    <div className={`rounded-full bg-slate-700 h-4 ${widthClasses[width]}`}></div>
  </div>)
  return content;
}

export default TextSkeleton;