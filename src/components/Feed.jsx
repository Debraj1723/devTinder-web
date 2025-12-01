import axios from "axios";
import constants from "../utils/constant";
import { use, useEffect, useState } from "react";
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

  if(feed.length <= 0){
    return (
      <h1 className="flex justify-center my-10">No new users found!</h1>
    )
  }

  return (
    feed && <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
