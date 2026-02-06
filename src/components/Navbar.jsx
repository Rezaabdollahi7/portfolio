import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import Notch from "./Notch";

const NavBar = () => {
  const { openWindow } = useWindowStore();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Apple logo" />
        <p className="font-bold">Reza's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <Notch />
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              className="icon-hover p-1 hover:bg-white/20 rounded-full transition-colors hover:cursor-pointer"
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
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default NavBar;
