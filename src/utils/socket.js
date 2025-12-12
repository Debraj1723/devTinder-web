import io from "socket.io-client";
import constants from "./constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(constants.baseUrl);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
