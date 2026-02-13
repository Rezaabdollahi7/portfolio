// components/NavBar/StatusBar.jsx

import React from "react";
import { Moon, Sun } from "lucide-react";
import dayjs from "dayjs";
import { useTheme } from "../../context/ThemeContext";
import { useControlPanel } from "./ControlPanelContext";

const StatusBar = ({ navIcons, modeButtonRef }) => {
  const { isDark, toggleTheme } = useTheme();
  const { toggleControlPanel, isControlPanelOpen } = useControlPanel();

  return (
    <div className="flex items-center gap-4">
      <ul className="flex gap-3">
        {navIcons.map(({ id, img }) => (
          <li
            key={id}
            ref={id === 4 ? modeButtonRef : undefined}
            onClick={id === 4 ? toggleControlPanel : undefined}
            className={`
              ${
                id === 4
                  ? "cursor-pointer hover:opacity-70 transition-opacity"
                  : ""
              }
              ${id === 4 && isControlPanelOpen ? "opacity-100" : ""}
            `}
          >
            <img src={img} className="icon-hover w-6 h-6" alt={`icon-${id}`} />
          </li>
        ))}
        <li>
          <button
            onClick={toggleTheme}
            className="icon-hover p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </li>
      </ul>
      <time className="text-white text-sm">
        {dayjs().format("ddd MMM D h:mm A")}
      </time>
    </div>
  );
};

export default StatusBar;
