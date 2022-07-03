import React, { useContext } from "react";
import { StoreContext } from "./AudioPlayer";
import songs from "./songs.json";

import "../App.css";

function SongsList() {
  const { state, dispatch } = useContext(StoreContext);
  const { songIndex } = state;

  return (
    <div className="px-10 flex  gap-y-1">
      <ul>
        {songs.map((song, i) => (
          <li
            key={song.title}
            onClick={() => {
              dispatch({
                type: "CHOOSE_SONG",
                payload: { song, index: i },
              });
            }}
          >
            <div className="flex-initial">
              <div className=" px-5 w-full rounded-xl songs shadow-l  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 hover:text-l hover:border-1 hover:border-solid hover:font-red uration-300 ...">
                <div
                  style={{
                    color: songIndex === i ? "#FF3369" : "rgb(82, 84, 96)",
                    fontWeight: songIndex === i ? "bolder" : "normal",
                  }}
                >
                  {song.title}
                </div>
                {song.artist}
                {/* <div className="flex justify-items-end ...">{song.length}</div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongsList;
