import { useParams } from "react-router-dom";

const Chat = () => {
  const { userID } = useParams();
  return (
    <div className="flex flex-col h-screen w-full max-w-lg mx-auto ">
      <header className="bg-green-500 text-white p-3 text-center border-b border-green-600 shrink-0 absolute w-full max-w-[500px]">
        <h3 className="text-lg font-semibold">Simple Chat Room</h3>
      </header>

      <div
        className="p-4 overflow-y-auto absolute w-full top-[117px] h-[calc(100vh-183px)] max-w-[500px]"
        id="chat-box"
      >
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </div>

      <footer className="flex p-3 bg-base-300 shrink-0 absolute bottom-0 w-full max-w-[500px]">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          id="message-input"
        />
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-150"
          id="send-button"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
