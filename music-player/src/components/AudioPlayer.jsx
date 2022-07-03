/* eslint-disable react-hooks/exhaustive-deps */
import SongsList from "./SongsList.jsx";
import Playbar from "./Playbar.jsx";
import React, { createContext, useReducer } from "react";


import reducer, { initialState } from "../reducer";

export const StoreContext = createContext(null);

function AudioPLayer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const song = state.songs[state.songIndex];

  return (
    <div className="mx-auto audioPlayer flex justify-center align-center items-center">

    
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="audioPlayer  ">
        <div className="px-20 text-center  title text-xl font-extrabold">{song.title}</div>
        <div className="px-20 text-center  text-lg">{song.artist}</div>
        <Playbar />
        <br/>
        <SongsList />
      </div>
    </StoreContext.Provider>
    
    
</div>
  );
}

export default AudioPLayer;
