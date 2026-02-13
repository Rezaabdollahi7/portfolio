// components/NavBar/ControlPanel/index.jsx

import React from "react";
import ConnectionStatus from "./ConnectionStatus";
import MusicPlayer from "./MusicPlayer";
import BrightnessControl from "./BrightnessControl";
import VolumeControl from "./VolumeControl";
import { Bluetooth, Activity, BatteryFull, BellDot } from "lucide-react";

const ControlPanel = () => {
  return (
    <div className="text-3xl bg-gray-100/20 absolute top-[140%] right-[1%] flex flex-col py-8 px-6 rounded-3xl backdrop-blur-lg shadow-2xl  animate-fade-in-up max-w-md">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ConnectionStatus />
        <MusicPlayer />

        <div className="grid col-span-2 grid-cols-4 gap-3">
          <div className="flex gap-3 rounded-full border border-gray-50 pl-3 pr-8 py-2 col-span-2 bg-white/10">
            <div className="icon-container bg-white rounded-full p-1">
              <Bluetooth className="size-8 text-blue-500 p-1" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-sm">Bluetooth</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="col-span-1">
              <div className="icon-container border border-gray-50 rounded-full p-2 bg-white/10">
                <Activity className="size-8 text-white p-1" />
              </div>
            </div>
            <div className="col-span-1">
              <div className="icon-container border border-gray-50 rounded-full p-2 bg-white/10">
                <BatteryFull className="size-8 text-white p-1" />
              </div>
            </div>
            <div className="col-span-1">
              <div className="icon-container border border-gray-50 rounded-full p-2 bg-white/10">
                <BellDot className="size-8 text-white p-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <BrightnessControl />
        <VolumeControl />
      </div>
    </div>
  );
};

export default ControlPanel;
