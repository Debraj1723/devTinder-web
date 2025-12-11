import io from "socket.io-client";
import constants from "./constant";

export const createSocketConnection = () => {
  return io(constants.baseUrl);
};
