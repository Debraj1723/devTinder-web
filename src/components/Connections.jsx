import axios from "axios";
import constants from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(constants.baseUrl + "users/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
    } catch (e) {
      //hanfdle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <ul className="list bg-base-300 rounded-box shadow-md my-5 mx-5">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          No Connections Found
        </li>
      </ul>
    );
  }

  return (
    <div>
      <ul className="list bg-base-300 rounded-box shadow-md my-5 mx-5">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Your connections
        </li>
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl } = connection;
          return (
            <Link to={"/chat/" + connection._id} key={connection._id}>
              <li className="list-row" >
                <div>
                  <img className="size-10 rounded-box" src={photoUrl} />
                </div>
                <div>
                  <div>{firstName + " " + lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    online
                  </div>
                </div>
                <p className="list-col-wrap text-xs">
                  "Remaining Reason" became an instant hit, praised for its
                  haunting sound and emotional depth. A viral performance
                  brought it widespread recognition, making it one of Dio Lupa’s
                  most iconic tracks.
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
