import React, {CSSProperties} from 'react';
import {IHeaderProps} from "../../models";
import HeaderItem from "./HeaderItem";
import ConvertTo from "./ConvertTo";
import ConvertToModal from "../Modals/ConvertTo/ConvertToModal";
import {useSelector} from "react-redux";
import {selectModalState} from "../../store/Slices/convertSlice";

function Header({name}: IHeaderProps) {
  const convertModalState = useSelector(selectModalState);
  return (
    <>
      <div className={"z-[1] fixed w-full top-0"}>
        <div className={`dark:bg-dark-main select-none bg-white h-16 flex w-full mx-auto`}>
          <div className={`container w-full m-auto flex justify-between items-center text-white`}>
            <div className="flex items-center">
              <div className="logo-name flex items-center mr-5 border-r-2 pr-5 border-r-dark-sub">
                <img src="./src/assets/logo.svg" alt="404" className="w-8 mr-3"/>
                <p className="text-[18px]">{name}</p>
              </div>
              <div className="header-items flex items items-center text-[18px]">
                <HeaderItem text={'Trending'} route={'/'}/>
                <HeaderItem text={'Favourite'} route={'/favourite'} />
                <HeaderItem text={'Search'} route={'/'} />
              </div>
            </div>
            <ConvertTo />
          </div>
        </div>
      </div>
      {convertModalState === 'block' ? <ConvertToModal/> : null}
    </>
  );
}

export default Header;