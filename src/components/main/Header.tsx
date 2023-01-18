import React, {CSSProperties} from 'react';
import {IHeaderProps} from "../../models";
import HeaderItem from "./HeaderItem";
import ConvertTo from "./ConvertTo";

function Header({name}: IHeaderProps) {
  return (
    <div className={"z-[1] sticky top-0"}>
      <div className={`dark:bg-dark-main select-none bg-white h-16 flex w-full mx-auto`}>
        <div className={`container w-full m-auto flex items-center text-white`}>
          <div className="logo-name flex items-center mr-5 border-r-2 pr-5 border-r-dark-sub">
            <img src="./src/assets/logo.svg" alt="404" className="w-8 mr-3"/>
            <p className="text-[18px]">{name}</p>
          </div>
          <div className="header-items flex items items-center text-[18px]">
            <HeaderItem text={'Trending'} />
            <HeaderItem text={'Favourite'} />
            <HeaderItem text={'Search'} />
          </div>
        </div>
      </div>
      <ConvertTo />
    </div>

  );
}

export default Header;