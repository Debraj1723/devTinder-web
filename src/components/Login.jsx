import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import constants from "../utils/constant";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        constants.baseUrl + "signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (e) {
      setErrorMessage(
        e?.response?.data || "Something went wrong, please try again later."
      );
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        constants.baseUrl + "login",
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (e) {
      setErrorMessage(
        e?.response?.data || "Something went wrong, please try again later."
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
  <div className="card bg-transparent w-full max-w-[500px] shadow-none">
    <div className="card-body">
      <h2 className="card-title justify-center">
        {isLogin ? "Login" : "Sign up"}
      </h2>

      <div>
        {!isLogin && (
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
        )}

        {!isLogin && (
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
        )}

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Email ID</legend>
          <input
            type="email"
            className="input w-full"
            placeholder="Type here"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
      </div>

      <p className="text-red-300">{errorMessage}</p>

      <div className="card-actions justify-center my-5">
        <button className="btn btn-primary" onClick={submit}>
          {isLogin ? "Login" : "Sign up"}
        </button>
      </div>

      <p
        className="m-auto cursor-pointer py-2"
        onClick={() => setIsLogin((value) => !value)}
      >
        {isLogin ? "New User? Signup here" : "Existing User? Login Here"}
      </p>
    </div>
  </div>
</div>

    // <div className="flex justify-center my-10">
    //   <div className="card bg-base-300 w-96 shadow-xl">
    //     <div className="card-body">
    //       <h2 className="card-title justify-center">
    //         {isLogin ? "Login" : "Sign up"}
    //       </h2>
    //       <div>
    //         {!isLogin && (
    //           <fieldset className="fieldset w-full max-w-xs">
    //             <legend className="fieldset-legend">First Name</legend>
    //             <input
    //               type="text"
    //               className="input w-full max-w-xs"
    //               placeholder="Type here"
    //               value={firstName}
    //               onChange={(e) => setFirstName(e.target.value)}
    //             />
    //           </fieldset>
    //         )}
    //         {!isLogin && (
    //           <fieldset className="fieldset w-full max-w-xs">
    //             <legend className="fieldset-legend">Last Name</legend>
    //             <input
    //               type="text"
    //               className="input w-full max-w-xs"
    //               placeholder="Type here"
    //               value={lastName}
    //               onChange={(e) => setLastName(e.target.value)}
    //             />
    //           </fieldset>
    //         )}
    //         <fieldset className="fieldset w-full max-w-xs">
    //           <legend className="fieldset-legend">Email ID</legend>
    //           <input
    //             type="email"
    //             className="input w-full max-w-xs"
    //             placeholder="Type here"
    //             value={emailId}
    //             onChange={(e) => setEmailId(e.target.value)}
    //           />
    //         </fieldset>
    //         <fieldset className="fieldset">
    //           <legend className="fieldset-legend">Password</legend>
    //           <input
    //             type="password"
    //             className="input w-full max-w-xs"
    //             placeholder="Type here"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </fieldset>
    //       </div>
    //       <p className="text-red-300">{errorMessage}</p>
    //       <div className="card-actions justify-center my-5">
    //         <button className="btn btn-primary" onClick={submit}>
    //           {isLogin ? "Login" : "Sign up"}
    //         </button>
    //       </div>
    //       <p
    //         className="m-auto cursor-pointer py-2"
    //         onClick={() => setIsLogin((value) => !value)}
    //       >
    //         {isLogin ? "New User? Signup here" : "Existing User? Login Here"}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
