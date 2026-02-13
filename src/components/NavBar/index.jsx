// components/NavBar/index.jsx

import React, { useRef, useEffect } from "react";
import { useControlPanel, ControlPanelProvider } from "./ControlPanelContext";
import NavMenu from "./NavMenu";
import StatusBar from "./StatusBar";
import ControlPanel from "./ControlPanel";
import Notch from "../Notch";
import { navLinks, navIcons } from "#constants";

const NavBarContent = () => {
  const { isControlPanelOpen, closeControlPanel } = useControlPanel();
  const controlPanelRef = useRef(null);
  const modeButtonRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsidePanel =
        controlPanelRef.current &&
        !controlPanelRef.current.contains(event.target);
      const isClickOnModeButton =
        modeButtonRef.current && modeButtonRef.current.contains(event.target);

      if (isClickOutsidePanel && !isClickOnModeButton) {
        closeControlPanel();
      }
    };

    if (isControlPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isControlPanelOpen, closeControlPanel]);

  // Close panel with ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeControlPanel();
      }
    };

    if (isControlPanelOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isControlPanelOpen, closeControlPanel]);

  return (
    <nav>
      <div className="w-full">
        <div className="flex justify-between items-center w-full ">
          <NavMenu navLinks={navLinks} />
          <Notch />
          <StatusBar navIcons={navIcons} modeButtonRef={modeButtonRef} />
        </div>
      </div>

      {isControlPanelOpen && (
        <div ref={controlPanelRef}>
          <ControlPanel />
        </div>
      )}
    </nav>
  );
};

const NavBar = () => (
  <ControlPanelProvider>
    <NavBarContent />
  </ControlPanelProvider>
);

export default NavBar;
