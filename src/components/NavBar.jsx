import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
import more from "../assets/more.svg";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [showMenu, toggleMenu] = useState(false);

  return (
    <div className="navbar bg-base-300 shadow-sm fixed w-full max-w-[500px] z-[12]">
      <div className="flex flex-1">
        {user && (
          <img
            className="ml-2"
            src={more}
            onClick={() => toggleMenu(!showMenu)}
          />
        )}
        <Link to={"/"} className="btn btn-ghost text-xl">
          👨‍💻tinderLite
        </Link>
      </div>
      {showMenu && <Menu />}
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end  mx-5 flex">
            {/* <p className="px-4">{user.firstName} </p> */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
