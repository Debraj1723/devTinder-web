import axios from "axios";
import constants from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async (page) => {
    if (feed) return;
    try {
      const res = await axios.get(constants.baseUrl + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <div>
        <h1 className="flex justify-center my-10">No new users found!</h1>
        {/* <Menu currentTab={'feed'} /> */}
      </div>
    );
  }

  return (
    feed && (
      <div>
        <div className="flex justify-center mx-5 my-5">
          <UserCard user={feed[0]} />
        </div>
        {/* <Menu currentTab={'feed'} /> */}
      </div>
    )
  );
};

export default Feed;
