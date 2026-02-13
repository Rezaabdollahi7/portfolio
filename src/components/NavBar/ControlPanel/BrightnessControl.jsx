// components/NavBar/ControlPanel/BrightnessControl.jsx

import React from "react";
import { useControlPanel } from "../ControlPanelContext";

const BrightnessControl = () => {
  const { brightness, setBrightness } = useControlPanel();

  const handleBrightnessChange = (e) => {
    const value = parseInt(e.target.value);
    setBrightness(value);
  };

  return (
    <div className="flex flex-col gap-2 bg-white/10 rounded-2xl w-full p-4">
      <div className="flex justify-between items-start w-full">
        <span className="text-white font-semibold text-sm flex items-center gap-2">
          Display Brightness
        </span>
        <span className="text-gray-700 font-semibold text-sm">
          {brightness}%
        </span>
      </div>
      <input
        type="range"
        min="10"
        max="100"
        value={brightness}
        onChange={handleBrightnessChange}
        className="w-full h-3 bg-white/50 rounded-full appearance-none cursor-pointer accent-white"
        aria-label="Display brightness control"
      />
    </div>
  );
};

export default BrightnessControl;
