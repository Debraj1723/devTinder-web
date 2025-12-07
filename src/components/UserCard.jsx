import axios from "axios";
import constants from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { photoUrl, firstName, lastName, about, age, gender, _id } = user;

  const handleSendRequest = async (status, userID) => {
    try {
      const res = await axios.post(
        constants.baseUrl + "request/send/" + status + "/" + userID,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userID));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + (lastName ? " " + lastName : "")}
        </h2>

        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about || "N.A."}</p>

        <div className="card-actions justify-end">
          <div
            className="badge badge-secondary"
            onClick={() => handleSendRequest("Ignored", _id)}
          >
            Ignore
          </div>
          <div
            className="badge badge-primary"
            onClick={() => handleSendRequest("Interested", _id)}
          >
            Interested
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
