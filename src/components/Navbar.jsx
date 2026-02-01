import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";

const NavBar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Apple logo" />
        <p className="font-bold">Reza's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={()=>openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};
export default NavBar;
