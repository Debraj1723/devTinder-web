import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async () => {
    
    try {
      const res = await axios.post(
        "http://localhost:9000/login",
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );
       dispatch(addUser(res.data))
       return navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="">
            <fieldset className="fieldset w-full max-w-xs">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input w-full max-w-xs"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input w-full max-w-xs"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
