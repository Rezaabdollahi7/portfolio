// components/NavBar/ControlPanel/ConnectionStatus.jsx

import React from "react";
import { Wifi, Focus, AlarmClockCheck, CastIcon } from "lucide-react";

const ConnectionStatus = () => {
  return (
    <div className="flex flex-col col-span-1 h-full">
      <div className="flex gap-3 rounded-full w-full border border-gray-50 pl-3 pr-8 py-2 bg-white/10">
        <div className="icon-container bg-white rounded-full p-1">
          <Wifi className="size-8 text-blue-500 p-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white font-semibold text-sm">Wi-Fi</p>
          <span className="text-gray-300 text-sm">Home</span>
        </div>
      </div>
      <div className="hotspot-bluetoth flex gap-3 ">
        <div className="icon-container bg-white rounded-full p-2">
          <Focus className="size-8 text-blue-500 p-1" />
        </div>
        <div className="icon-container bg-white rounded-full p-2">
          <AlarmClockCheck className="size-8 text-blue-500 p-1" />
        </div>
        <div className="icon-container bg-white rounded-full p-2">
          <CastIcon className="size-8 text-blue-500 p-1" />
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
