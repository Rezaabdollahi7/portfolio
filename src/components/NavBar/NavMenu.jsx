// components/NavBar/NavMenu.jsx

import React from "react";
import useWindowStore from "#store/window";

const NavMenu = ({ navLinks }) => {
  const { openWindow } = useWindowStore();

  return (
    <div className="flex items-center gap-8">
      <img src="/images/logo.svg" alt="Apple logo" className="h-6" />
      <p className="font-bold text-white">Reza's Portfolio</p>
      <ul className="flex gap-6">
        {navLinks.map(({ id, name, type }) => (
          <li
            key={id}
            onClick={() => openWindow(type)}
            className="text-white text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors"
          >
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;
