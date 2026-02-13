// components/NavBar/ControlPanel/VolumeControl.jsx

import React from "react";
import { useControlPanel } from "../ControlPanelContext";

const VolumeControl = () => {
  const { volume, setVolume } = useControlPanel();

  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value);
    setVolume(value);
  };

  return (
    <div className="flex flex-col gap-2 pt-2 bg-white/10 rounded-2xl w-full p-4">
      <div className="flex justify-between items-start w-full">
        <span className="text-white font-semibold text-sm flex items-center gap-2">
          Volume
        </span>
        <span className="text-gray-700 font-semibold text-sm">{volume}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="w-full h-3 bg-white/50 rounded-full appearance-none cursor-pointer accent-white"
        aria-label="Volume control"
      />
    </div>
  );
};

export default VolumeControl;
