import constants from "../utils/constant";
import { Link } from "react-router-dom";

const Menu = ({ currentTab }) => {
  let menu = constants.menu;
  return (
    <ul className="menu menu-horizontal bg-base-300 rounded-xl p-3 fixed bottom-6 left-1/2 -translate-x-1/2 w-max flex !justify-center !items-center text-center shadow-xl">
      {menu.map((e, i) => {
        return (
          <li
            className={currentTab === e.value ? "bg-base-300 rounded-xl" : ""}
            key={e.value + i}
          >
            <Link to={e.value !== "feed" ? "/" + e.value : "/"}>
              {e.displayName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
