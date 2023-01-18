import React from 'react';

export interface ILogoProps {
  src : string
}

function Logo({src} : ILogoProps) {
  return (
    <img src={src} alt="404"
         className="rounded-full w-8 h-8 transition hover:scale-105">
    </img>
  );
}

export default Logo;