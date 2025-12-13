import { useDispatch } from "react-redux";
import constants from "../utils/constant";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("");
  const [showData, setShowData] = useState(false);

  const menu = constants.menu;

  useEffect(() => {
    setCurrentTab(
      location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "feed"
    );
    setShowData(true);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        constants.baseUrl + "logout",
        {},
        { withCredentials: true }
      );
      dispatch({ type: "logout" });
      setShowData(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  if (showData) {
    return (
      <div>
        <ul className="menu menu-vertical bg-base-300  p-3 fixed w-1/2 h-screen top-0 z-[14] shadow-xl left-0 h-[calc(100vh-64px)] top-16">
          {menu.map((e, i) => {
            console.log(currentTab === e.value, { currentTab, value: e.value });
            return (
              <li
                className={currentTab === e.value ? "bg-base-300 " : ""}
                key={e.value + i}
              >
                <Link
                  to={e.value !== "feed" ? "/" + e.value : "/"}
                  onClick={() => setShowData(false)}
                >
                  {e.displayName}
                </Link>
              </li>
            );
          })}
          <li className="text-red-500 font-bold" onClick={handleLogout}>
            <Link>logout</Link>
          </li>
        </ul>
      </div>

    );
  }
};

export default Menu;
