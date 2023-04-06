import React, {useState} from 'react';
import {useAppDispatch} from "../../../store/store";
import {addFavourite} from "../../../store/Slices/favouriteSlice";

function AddToken() {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch()
  return (
    <div className={`w-[400px] h-[300px]`}>
      <div className={"input-area"}>
        <p className={`text-white text-[18px]`}>Add new cryptocurrency</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(addFavourite(inputValue))
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`border w-full rounded-lg bg-white/10 my-4 px-3 py-1 text-white border-dark-main/50 hover:border-colorful-1/80 focus:outline-none focus:border-colorful-1`}
            type="text"/>
        </form>
      </div>
      <div className={"items-area"}>
      </div>
    </div>

  );
}

export default AddToken;