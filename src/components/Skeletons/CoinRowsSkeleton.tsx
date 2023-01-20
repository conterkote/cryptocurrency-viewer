import React from 'react';
import coinRowSkeleton from "./CoinRowSkeleton";
import CoinRowSkeleton from "./CoinRowSkeleton";

export interface ICoinRowsSkeletonProps {
  rowsCount : number
}

function CoinRowsSkeleton({rowsCount} : ICoinRowsSkeletonProps) {
  const content = []
  for (let i = 0; i < rowsCount; i++) {
    content.push(<CoinRowSkeleton key={i + '-CoinRowSkeleton'}/>)
  }
  return (
    <>
      {content}
    </>
  );
}

export default CoinRowsSkeleton;