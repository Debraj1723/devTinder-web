import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import constants from "../utils/constant";
import { addRequests, removeRequests } from "../utils/requestStore";
import { useEffect } from "react";
import Menu from "./Menu";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestID) => {
    try {
      await axios.post(
        constants.baseUrl + "request/review/" + status + "/" + requestID,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestID));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(constants.baseUrl + "users/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div>
        <ul className="list ">
          <li className="p-2 text-xs opacity-60 tracking-wide">
            No requests found
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className="list ">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Your requests
        </li>
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserID;
          return (
            <li className="list-row" key={request._id}>
              <div>
                <img className="size-10 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div> {firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>
              <div className="list-col-wrap text-xs flex justify-end gap-2">
                <button
                  className="btn btn-soft btn-error"
                  onClick={() => reviewRequest("Rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-soft btn-success"
                  onClick={() => reviewRequest("Accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
