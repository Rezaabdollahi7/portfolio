import { createContext, useContext } from "react";

export const WindowContext = createContext({
  windowKey: null,
  title: "",
  isMobile: false,
  isFocused: true,
  isMaximized: false,
  isVisible: false,
  setHandle: () => {},
});

export const useWindowContext = () => useContext(WindowContext);
