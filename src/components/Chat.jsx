import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import constants from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { userID } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = useSelector((store) => store.user);
  const personalUserID = user?._id;

  const fetchChats = async () => {
    try {
      const res = await axios.post(
        constants.baseUrl + "chats",
        { participants: [userID, personalUserID] },
        {
          withCredentials: true,
        }
      );
      setMessages(res.data);
    } catch (e) {
      //hanfdle error
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    if (socket && personalUserID) {
      socket.emit("joinChat", { receiver: userID, sender: personalUserID });
    }

    socket.on("messageReceived", ({ sender, text }) => {
      setMessages((messages) => [...messages, { senderID: sender, text }]);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [personalUserID, userID]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      receiver: userID,
      sender: personalUserID,
      text,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto ">
      <header className="bg-green-500 text-white p-3 text-center border-b border-green-600 shrink-0 absolute w-full max-w-[500px]">
        <h3 className="text-lg font-semibold">Simple Chat Room</h3>
      </header>

      <div
        className="p-4 overflow-y-auto absolute w-full top-[117px] h-[calc(100vh-183px)] max-w-[500px]"
        id="chat-box"
      >
        {messages.map((message) => {
          return (
            <div>
              {message.senderID !== personalUserID && (
                <div className="chat chat-start">
                  <div className="chat-bubble">{message.text}</div>
                </div>
              )}
              {message.senderID === personalUserID && (
                <div className="chat chat-end">
                  <div className="chat-bubble">{message.text}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="flex p-3 bg-base-300 shrink-0 absolute bottom-0 w-full max-w-[500px]">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          id="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-150"
          id="send-button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
