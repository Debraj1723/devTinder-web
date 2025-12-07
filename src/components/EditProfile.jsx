import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import constants from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  console.log(userData);
  const [showToast, setToast] = useState(false);

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName);
  const [age, setAge] = useState(+userData.age);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [gender, setGender] = useState(userData.gender);
  const [about, setAbout] = useState(userData.about);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        constants.baseUrl + "profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (e) {
      setErrorMessage(e.response.data);
    }
  };

  return (
    <div>
      {edit && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit profile</h2>
            <div className="">
              <fieldset className="fieldset w-full max-w-xs">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input w-full max-w-xs"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input w-full max-w-xs"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  className="input w-full max-w-xs"
                  placeholder="Type here"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input w-full max-w-xs"
                  placeholder="Type here"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                type="number"
                className="input w-full max-w-xs"
                placeholder="Type here"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <p className="text-red-300">{errorMessage}</p>
            <div className="card-actions justify-center my-5">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {!edit && (
        <div className="card bg-base-300 shadow-sm  m-5">
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
                className="badge badge-primary"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit profile
              </div>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile data saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
