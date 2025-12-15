import axios from "axios";
import constants from "../utils/constant.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await axios.get(constants.baseUrl + "groups/get-list", {
        withCredentials: true,
      });
      setGroups(res.data);
    } catch (e) {
      //hanfdle error
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (!groups) return;

  if (groups.length === 0) {
    return (
      <div>
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            No groups found
          </li>
        </ul>
        <button
          className="btn btn-soft btn-secondary fixed bottom-[41px] right-[27px]"
          onClick={() => navigate("/create-group")}
        >
          <b>+</b> Create group
        </button>
      </div>
    );
  }

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Your groups
        </li>
        {groups.map((group) => {
          const { name, picture,about } = group;
          return (
            <Link to={"/group-chat/" + group._id} key={group._id}>
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={picture} />
                </div>
                <div>
                  <div>{name}</div>
                  <div className="text-xs font-semibold opacity-60">
                    {about}
                  </div>
                </div>
                <button className="btn btn-soft btn-success">Join chat</button>
              </li>
            </Link>
          );
        })}
      </ul>
      <button
        className="btn btn-soft btn-secondary fixed bottom-[41px] right-[27px]"
        onClick={() => navigate("/create-group")}
      >
        <b>+</b> Create group
      </button>
    </div>
  );
};

export default Groups;
