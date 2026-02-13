// components/NavBar/ControlPanel/MusicPlayer.jsx

import React from "react";
import { useControlPanel } from "../ControlPanelContext";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, playNextSong, playPreviousSong } =
    useControlPanel();

  return (
    <div className="col-span-1 flex flex-col rounded-2xl border border-gray-50 bg-white/10 items-center px-4 py-3 gap-1">
      <div className="flex items-center gap-1 w-full">
        <img
          src={currentSong.cover}
          alt="music-cover"
          className="size-10 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-3 ">
          <p className="text-white text-sm font-semibold truncate">
            {currentSong.title}
          </p>
          <span className="text-gray-300 text-xs truncate">
            {currentSong.artist}
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-2">
        <ChevronLeft
          className="text-white cursor-pointer hover:text-blue-400 transition-colors size-6"
          onClick={playPreviousSong}
        />
        <button
          onClick={togglePlay}
          className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? (
            <Pause className="size-6 text-black" />
          ) : (
            <Play className="size-6 text-black " />
          )}
        </button>
        <ChevronRight
          className="text-white cursor-pointer hover:text-blue-400 transition-colors size-6"
          onClick={playNextSong}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
