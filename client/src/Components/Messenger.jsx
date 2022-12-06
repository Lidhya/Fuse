import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import Axios from "../axios";
import Message from "./Message";
import Conversations from "./Conversations";
import EmojiPicker from "emoji-picker-react";
import { errorHandler } from "./javascripts/errorHandler";
/* ---------------------------------- icons --------------------------------- */
import blank_profile from "../assets/empty profile/blank_profile.png";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { SocketContext } from "../context/SocketContext";
// import CallIcon from '@mui/icons-material/Call';
// import VideocamIcon from '@mui/icons-material/Videocam';

function Messenger() {
  const { currentUser } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { socket, onlineUsers } = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const [showPicker, setShowPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        Axios.get(`/conversations/${currentUser?._id}`)
          .then(({ data }) => {
            setConversations(data);
          })
          .catch((error) => errorHandler());
      } catch (err) {
        errorHandler();
      }
    };
    getConversations();
  }, [currentUser._id]);

  const getUser = () => {
    try {
      const friendId = currentChat?.members.find((m) => m !== currentUser._id);
      friendId &&
        Axios.get(`/user/get/${friendId}`)
          .then(({ data }) => {
            setUser(data);
          })
          .catch((error) => errorHandler());
    } catch (error) {
      errorHandler();
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        Axios.get(`/messages/${currentChat?._id}`)
          .then(({ data }) => {
            setMessages(data);
            getUser();
          })
          .catch((error) => errorHandler());
      } catch (err) {
        errorHandler();
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.length && !onlySpaces(newMessage)) {
      setErrorMessage("");
      const message = {
        conversationId: currentChat._id,
        sender: currentUser._id,
        text: newMessage,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== currentUser._id
      );

      socket.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId,
        text: newMessage,
      });

      try {
        Axios.post("/messages", message)
          .then(({ data }) => {
            setMessages([...messages, data]);
            setNewMessage("");
          })
          .catch((error) => errorHandler());
      } catch (error) {
        errorHandler();
      }
    } else {
      setErrorMessage("Enter a message");
    }
  };

  const onEmojiClick = (event) => {
    setNewMessage((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const handleHamClick = (e) => {
    e && e.preventDefault();
    setShowPicker(false);
    document.getElementById("chat-list").classList.toggle("hidden");
  };

  return (
    <div className=" flex justify-center h-full">
      <aside
        className="md:w-1/5 hidden md:block absolute sm:w-full md:static w-screen "
        id="chat-list"
      >
        <div className="overflow-y-auto pt-20 h-screen  px-3 bg-gray-50 rounded dark:bg-gray-900">
          <ul className="">
            <li className="border-b border-gray-200 dark:border-gray-700">
              <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                <span className="ml-3 font-semibold">Messages</span>
              </button>
            </li>
            {conversations &&
              conversations.map((convo) => (
                <div
                  key={convo._id}
                  onClick={(e) => {
                    setCurrentChat(convo);
                    handleHamClick(e);
                  }}
                  className="border-b border-gray-600"
                >
                  <Conversations
                    setCurrentChat={setCurrentChat}
                    conversation={convo}
                  />
                </div>
              ))}
          </ul>
        </div>
      </aside>
      <div className="w-4/5 mt-20 mx-3 mb-3">
        {currentChat ? (
          <>
            <div className=" rounded-lg p-2 flex flex-wrap content-end justify-between items-center bg-purple-900">
              <div className="flex gap-4 items-center">
                <div className="">
                  <button
                    onClick={handleHamClick}
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                    aria-controls="navbar-search"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open menu</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    user?.profilePicture ? user.profilePicture : blank_profile
                  }
                  alt="user"
                />
                <div className="flex flex-col text-base font-semibold text-white ">
                  <span>{user?.fname + " " + user?.lname}</span>
                  {onlineUsers?.includes(user?._id) && (
                    <span className="text-sm font-light">Online</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                {/* <div className='p-1 rounded-full bg-purple-400 text-white'><CallIcon /></div>
                                <div className='p-1 rounded-full bg-purple-400 text-white'><VideocamIcon /></div> */}
                <div className="p-1 rounded-full bg-purple-400 text-white">
                  <MoreVertOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="min-h-[90%] rounded-b-lg flex flex-col justify-end bg-white overflow-auto ">
              <div
                className="overflow-y-scroll h-96"
                style={{ minHeight: "32rem" }}
              >
                {messages.length > 0 ? (
                  messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={m}
                        user={user}
                        // currentUser={currentUser}
                        own={m.sender === currentUser._id}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <span className="text-4xl text-gray-400">
                      Send a message and start the chat
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-24">
                {showPicker && (
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    emojiStyle={{ position: "absolute" }}
                  />
                )}
              </div>

              <div className="flex gap-2 m-2 items-center">
                <InsertEmoticonIcon
                  className="text-gray-600"
                  onClick={() => setShowPicker((val) => !val)}
                />
                <textarea
                  name="message"
                  rows={2}
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  id=""
                  placeholder="Send something..."
                  className="border border-solid border-gray-400 p-2 focus:outline-none rounded-2xl w-full"
                />
                <p className="text-red-400 text-sm">
                  {errorMessage && errorMessage}
                </p>
                <button
                  onClick={handleSend}
                  type="submit"
                  className="rounded-lg p-4  text-white bg-purple-800"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center gap-2 items-center h-96 md:h-full">
            <div className="md:hidden">
              <button
                onClick={handleHamClick}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                aria-controls="navbar-search"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <span className="text-2xl md:text-4xl text-gray-400">
              Open a conversation to start a chat.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenger;
