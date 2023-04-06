import React, {useState} from 'react';
import FavouriteCoinsTableContainer from "../Containers/FavouriteCoinsTableContainer";
import Modal from "../components/UI/Modal";
import AddToken from "../components/Modals/addToken/addToken";
import { FaPlus } from "react-icons/all";

function Favourite() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="container flex flex-col mx-auto py-32">
      <FavouriteCoinsTableContainer/>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddToken />
      </Modal>
      <div className={`w-full flex justify-center cursor-pointer group`}
           onClick={() => setIsOpen(true)}
      >
        <div className={`w-12 h-12 bg-gradient-to-br rounded-full from-colorful-1  to-colorful-2 opacity-0 py-2 group-hover:opacity-100 transition relative`}>
          <FaPlus className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-white opacity-0 group-hover:opacity-100 transition text-xl`}/>
        </div>
      </div>
    </div>
  );
}

export default Favourite;