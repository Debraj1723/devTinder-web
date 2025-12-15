import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import constants from "../utils/constant";
import axios from "axios";

const GroupChat = () => {
  const { groupID } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);

  const user = useSelector((store) => store.user);
  const chatRef = useRef(null);
  const personalUserID = user?._id;

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        constants.baseUrl + "group-chats",
        { participants: groupDetails.members },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
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

  const fetchGroupDetails = async () => {
    try {
      const res = await axios.get(
        constants.baseUrl + "groups/details/" + groupID,
        {
          withCredentials: true,
        }
      );
      setGroupDetails(res.data);
    } catch (e) {
      //hanfdle error
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [groupID]);

  useEffect(() => {
    if (!groupDetails?.members?.length) return;
    fetchChats();
  }, [groupDetails]);

  useEffect(() => {
    if (!groupDetails) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      participants: groupDetails.members,
    });

    socket.on("groupMessageReceived", ({ sender, senderName, text }) => {
      setMessages((prev) => [
        ...prev,
        { senderID: { _id: sender, firstName: senderName }, text },
      ]);
    });

    return () => socket.disconnect();
  }, [groupDetails]);
  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendGroupMessage", {
      participants: groupDetails.members,
      sender: personalUserID,
      senderName: user.firstName,
      text,
    });
    setText("");
  };

  return (
    <div>
      {groupDetails && (
        <div className="flex gap-4 w-full max-w-[500px] items-center py-[10px] px-[16px] bg-base-300 border-t border-black rounded-bl-[14px] rounded-br-[14px] fixed top-[64px]">
          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={groupDetails.picture}
              />
            </div>
          </div>
          <p>{groupDetails.name} </p>
        </div>
      )}
      {isLoading && (
        <div className="p-4 overflow-y-auto absolute w-full top-[117px] h-[calc(100vh-183px)] max-w-[500px] flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}
      {!isLoading && (
        <div
          className="overflow-y-auto w-full h-[calc(100vh-66px-75px-64px)] max-w-[500px] py-[30px] px-4 fixed bottom-[66px]"
          id="chat-box"
          ref={chatRef}
        >
          {messages.map((message, i) => {
            return (
              <div key={i}>
                {message.senderID._id !== personalUserID && (
                  <div class="chat chat-start">
                    <div class="chat-header">{message.senderID.firstName}</div>
                    <div class="chat-bubble">{message.text}</div>
                  </div>
                )}
                {message.senderID._id === personalUserID && (
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

export default GroupChat;
