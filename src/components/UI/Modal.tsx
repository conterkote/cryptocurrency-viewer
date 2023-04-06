import React from 'react';

interface IModalProps {
  isOpen : boolean
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
  className ?: string
  children : JSX.Element
}

function Modal({isOpen, setIsOpen, className, children} : IModalProps) {
  if (!isOpen) return null;

  return (
    <div onMouseDown={() => setIsOpen(false)}
      className={`bg-gray-900/40 z-[2] left-1/2 top-1/2 w-full h-full flex items-center justify-center -translate-y-1/2 -translate-x-1/2 absolute bottom-0 block`}>
      <div onMouseDown={(e) => {
        e.stopPropagation()
      }}
        className={`${className} rounded-3xl bg-dark-sub box-border p-6`}>
        {children}
      </div>
    </div>
  );
}

export default Modal;