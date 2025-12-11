import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import constants from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Body = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(constants.baseUrl + "profile", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!userData || !userData._id) {
      fetchUser();
    }
  }, []);

  return (
    <div className="max-w-[500px] mx-auto h-screen">
      <Navbar />
      <div
        className={
          !["login", "chat"].includes(location.pathname.split("/")[1])
            ? "w-full overflow-y-auto h-[calc(100vh-64px-82px)]"
            : "w-full overflow-y-auto h-[calc(100vh-64px)]"
        }
      >
        <Outlet />
      </div>
      {!["login", "chat"].includes(location.pathname.split("/")[1]) && (
        <Menu
          currentTab={
            location.pathname.split("/")[1] === ""
              ? "feed"
              : location.pathname.split("/")[1]
          }
        />
      )}
    </div>
  );
};

export default Body;
