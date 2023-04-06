import React, {useEffect} from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {switchModalState} from "../store/Slices/convertSlice";

export function useOutsideClick(ref : React.MutableRefObject<HTMLDivElement | null>, dispatch : ThunkDispatch<any, any, any>) {
  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<HTMLElement>): void => {
      const { current } = ref;
      if (current && !current.contains(event.target as Node)) {
        dispatch(switchModalState())
      }
    };

    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [ref]);
}