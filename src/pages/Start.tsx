import React from 'react';
import MainCoinsTableContainer from "../Containers/MainCoinsTableContainer";

function Start() {
  return (
    <div className="mx-auto">
      <p className={`text-white text-3xl px-10 py-6`}>Trending</p>
      <MainCoinsTableContainer />
    </div>

  );
}

export default Start;