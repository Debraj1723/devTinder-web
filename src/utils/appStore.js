import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestStore";

const combinedReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionReducer,
  requests: requestReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
