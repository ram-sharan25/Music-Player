import React from "react";
import { useRef, useContext, useEffect } from "react";
import { StoreContext } from "./AudioPlayer";
import "./Playbar.css";

// import here from "../audio/George Harrison -Here comes the sun.mp3";
const formatTime = (length, inputSeconds) => {
  let seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) seconds = `0${seconds}`;
  let minutes = Math.floor(inputSeconds / 60);
  if (minutes < 10) minutes = `0${minutes}`;
  return `${minutes}:${seconds}`;
};

const handleProgress = (currentTime, length) => {
  if (currentTime === 0 && length === 0) {
    return 0;
  }
  return 100 * (currentTime / length);
};
function Playbar() {
  const { state, dispatch } = useContext(StoreContext);
  const audioRef = useRef();

  const { playing, currentTime, length, songIndex, songs } = state;

  useEffect(() => {
    if (playing) {
      //   audioRef.current.load();
      audioRef.current
        .play()
        // .then((res) => {
        //   console.log("res", res);
        // })
        .catch((err) => {
          console.log(err);
        });
    } else {
      audioRef.current.pause();
    }
  }, [playing, songIndex]);

  return (
    <div className="playbar">
      <audio
        ref={audioRef}
        src={`/audio/${songs[songIndex].title}.mp3`}
        onLoadedMetadata={() =>
          dispatch({
            type: "SET_DURATION",
            payload: audioRef.current.duration,
          })
        }
        onTimeUpdate={(e) =>
          dispatch({ type: "SET_CURRENT_TIME", payload: e.target.currentTime })
        }
        onEnded={() =>
          dispatch({
            type: "NEXT_SONG",
          })
        }
      />

      <div className="time">
        <div>{formatTime("CurrentTime", Math.floor(currentTime))}</div>
        <div>{formatTime("length", length)}</div>
      </div>

      <div
        className="progress"
        onClick={(e) => {
          // console.log(e)
          const { offsetLeft, offsetParent, offsetWidth } = e.target;
          const pos =
            (e.pageX - (offsetLeft + offsetParent.offsetLeft)) / offsetWidth;
          console.log(pos);
          console.log(audioRef.current.length);
          audioRef.current.currentTime = pos * audioRef.current.duration;
        }}
      >
        <div
          className="progressInner "
          style={{ width: `${handleProgress(currentTime, length)}%` }}
        />
      </div>
      <br />
      <div className="  flex justify-center">
        <div className="text-4xl font-bold ">
          <button
            onClick={() => {
              dispatch({
                type: "PREV_SONG",
              });
            }}
          >
            <i className="buttons  bg-slate-300 rounded-xl shadow-lg fa fa-backward transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-300 ..."></i>
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "SET_PLAYING",
                payload: playing ? false : true,
              });
            }}
          >
            {playing ? (
              <i className=" buttons px-6 mx-1 bg-slate-300 rounded-xl shadow-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-300 ... fa fa-pause" />
            ) : (
              <i className=" buttons px-6 mx-1 bg-slate-300 rounded-xl shadow-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-300 ... fa fa-play" />
            )}
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "NEXT_SONG",
              });
            }}
          >
            <i className="buttons bg-slate-300 rounded-xl shadow-lg fa fa-backward transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-300 ... fa fa-forward"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playbar;
