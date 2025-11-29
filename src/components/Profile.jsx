import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const userData = useSelector((store) => store.user);
  return (
   userData && <div>
      <EditProfile />
    </div>
  );
};

export default Profile;
