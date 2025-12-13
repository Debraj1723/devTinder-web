import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import constants from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { userID: targetUserID } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetUserDetails, setTargetUserDetails] = useState(null);

  const user = useSelector((store) => store.user);
  const chatRef = useRef(null);
  const personalUserID = user?._id;

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        constants.baseUrl + "chats",
        { participants: [targetUserID, personalUserID] },
        {
          withCredentials: true,
        }
      );
      setMessages(res.data);
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "instant",
        });
      }
      setIsLoading(false);
    } catch (e) {
      //hanfdle error
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const res = await axios.get(
        constants.baseUrl + "profile-details/" + targetUserID,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setTargetUserDetails(res.data);
    } catch (e) {
      //hanfdle error
    }
  };

  useEffect(() => {
    fetchProfileDetails();
    console.log(targetUserDetails);
    fetchChats();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    if (socket && personalUserID) {
      socket.emit("joinChat", {
        receiver: targetUserID,
        sender: personalUserID,
      });
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
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
  }, [personalUserID, targetUserID, messages]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      receiver: targetUserID,
      sender: personalUserID,
      text,
    });
    setText("");
  };

  return (
    <div>
      {targetUserDetails && (
        <div className="flex gap-4 w-full max-w-[500px] items-center py-[10px] px-[16px] bg-base-300 border-t border-black rounded-bl-[14px] rounded-br-[14px]">
          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={targetUserDetails.photoUrl}
              />
            </div>
          </div>
          <p>{targetUserDetails.firstName} </p>
        </div>
      )}
      {isLoading && (
        <div className="p-4 overflow-y-auto absolute w-full top-[117px] h-[calc(100vh-183px)] max-w-[500px] flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}
      {!isLoading && (
        <div
          className="overflow-y-auto absolute w-full top-[125px] h-[calc(100vh-198px)] max-w-[500px] py-[30px] px-4"
          id="chat-box"
          ref={chatRef}
        >
          {messages.map((message, i) => {
            return (
              <div key={i}>
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
      )}

      <footer className="flex p-3 bg-base-300 shrink-0 fixed bottom-0 w-full max-w-[500px]">
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
