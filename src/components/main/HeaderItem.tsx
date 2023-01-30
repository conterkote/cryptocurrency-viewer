import React, {CSSProperties, useState} from 'react';
import classes from './style/HeaderItem.module.css'
import {Link} from "react-router-dom";

export interface IHeaderItemProps {
  text : string,
  route : string
}

function HeaderItem({ text, route } : IHeaderItemProps) {
  const [position, setPosition] = useState<number>(0);
  const onMouseEnter = (e : React.MouseEvent) => {
    const clientX = e.clientX + 1
    const elementX = (e.target as HTMLParagraphElement).offsetLeft
    const delta = clientX - elementX
    const elementWidth = (e.target as HTMLParagraphElement).offsetWidth
    setPosition(delta / elementWidth * 100)
  }
  const style = {'--background-position-header-item' : `${position}%`} as CSSProperties
  return (
    // <p className="mr-8 hover:text-gradient-to-bl hover:from-colorful-1 hover:to-colorful-2">
    <Link to={`${route}`}>
      <p onMouseMove={onMouseEnter} style={style}
         className={`mr-8 ${classes.bgHover} cursor-pointer py-1 hover:text-transparent hover:bg-clip-text`}>
        {text}
      </p>
    </Link>
  );
}

export default HeaderItem;