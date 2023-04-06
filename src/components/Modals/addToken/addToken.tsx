import React, {useState} from 'react';
import {useAppDispatch} from "../../../store/store";
import {addFavourite} from "../../../store/Slices/favouriteSlice";
import useDebounce from "../../../customHooks/useDebounce";
import {useFetchCoinQuery} from "../../../store/Apis/logosApi";
import FavouriteSearchItem from "./FavouriteSearchItem";
import {ISymbol} from "../../../models";
import {toast} from "react-toastify";

function AddToken() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch()


  const debouncedValue = useDebounce(inputValue, 600)
  const {data, isFetching} = useFetchCoinQuery(debouncedValue, {
    refetchOnMountOrArgChange : true,
    skip : !debouncedValue
  })

  let searchItems

  async function onItemClickHandle(symbol : ISymbol) {
    try {
      await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol + 'USDT'}`).then(
        res => res.json()
      )
      dispatch(addFavourite(symbol))
    }
    catch (e) {
      toast.error('This coin doesn\'t supports',  {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  if (data && !isFetching) {
      searchItems = data.coins.map(coin => {
        if (coin.market_cap_rank <= 1000 && coin.market_cap_rank && coin.symbol !== 'USDT') {
          return <FavouriteSearchItem
            key={coin.symbol}
            name={coin.name}
            large={coin.large}
            marketRank={coin.market_cap_rank}
            symbol={coin.symbol}
            onClick={() => onItemClickHandle(coin.symbol)}
          />
        }
      }).filter(coin => !!coin)
    if (searchItems.length === 0) {
      searchItems = <p>Coin has not found</p>
    }

  }

  const onInputHandle = (e : React.SyntheticEvent) => {
    setInputValue((e.target as HTMLInputElement).value)
  }

  return (
    <div className={`w-[400px] h-[300px] grid grid-rows-[1fr_3fr]`}>
      <div className={"input-area"}>
        <p className={`text-white text-[18px]`}>Add new cryptocurrency</p>
          <input
            value={inputValue}
            onChange={onInputHandle}
            className={`border w-full rounded-lg bg-white/10 my-4 px-3 py-1 text-white border-dark-main/50 hover:border-colorful-1/80 focus:outline-none focus:border-colorful-1`}
            type="text"/>
      </div>
      <div className={`items-area box-border rounded-xl overflow-y-scroll bg-white/10 w-full scrollbar-none`}>
        {searchItems}
      </div>
    </div>

  );
}

export default AddToken;