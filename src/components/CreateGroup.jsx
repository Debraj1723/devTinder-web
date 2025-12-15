import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState([]);
  const [about, setAbout] = useState("");
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(constants.baseUrl + "users/connections", {
        withCredentials: true,
      });
      setConnections(res.data);
    } catch (e) {
      //hanfdle error
    }
  };

  const handleGroupCreation = async () => {
    try {
      const res = await axios.post(
        constants.baseUrl + "groups/create",
        {
          members: [...selectedMembers, user._id],
          admins: [user._id],
          name: name,
          picture: picture,
          about: about,
        },
        {
          withCredentials: true,
        }
      );
      return navigate("/groups");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCancel = () => {
    return navigate("/groups");
  };

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <div className="text-center space-y-1 my-5">
        <h1 className="text-lg font-medium text-gray-100">Create a group</h1>
        <p className="text-xs text-gray-500">
          Groups help you organize conversations
        </p>
      </div>
      <div className="px-5">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Select members</legend>
        </fieldset>
      </div>

      <ul className="list bg-base-100 rounded-box shadow-md mx-5">
        {connections.map((m) => {
          const { firstName, photoUrl } = m;
          return (
            <li className="list-row" key={m._id}>
              <div>
                <img className="size-10 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div>{firstName}</div>
              </div>
              <input
                type="checkbox"
                checked={selectedMembers.includes(m._id)}
                onChange={() => toggleMember(m._id)}
                className="checkbox checkbox-secondary"
              />
            </li>
          );
        })}
      </ul>
      <div className="divider px-5"></div>
      <div className="px-5">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Group Name</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full"
            placeholder="Type here"
          />
        </fieldset>
      </div>
      <div className="px-5">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Group picture</legend>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="input w-full"
            placeholder="Type here"
          />
        </fieldset>
      </div>
      <div className="px-5">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Group Bio</legend>
          <textarea
            className="textarea w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Bio"
          ></textarea>
        </fieldset>
      </div>
      <div className="card-actions justify-center p-6">
        <button className="btn btn-primary" onClick={handleGroupCreation}>Create</button>
        <button className="btn btn-error" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateGroup;
