import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessages } from "../../apiCalls/Message";
import { hideLoader, showLoader } from "../../redux/LoaderSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import moment from "moment";
import store from "../../redux/Store";
import { setAllChats } from "../../redux/UserSlice";
import EmojiPicker from "emoji-picker-react";
import { clearUnreadMessageCount } from "../../apiCalls/Chat";

// function ChatArea({ socket }) {
//   const dispatch = useDispatch();
//   const { selectedChat, user, allChats } = useSelector(
//     (state) => state.userReducer
//   );
//   const selectedUser = selectedChat.members.find((u) => u._id !== user._id);
//   const [message, setMessage] = useState("");
//   const [allMessages, setAllMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [data, setData] = useState(null);

//   const sendMessage = async (image) => {
//     try {
//       const newMessage = {
//         chatId: selectedChat._id,
//         sender: user._id,
//         text: message,
//         image: image,
//       };

//       socket.emit("send-message", {
//         ...newMessage,
//         members: selectedChat.members.map((m) => m._id),
//         read: false,
//         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
//       });

//       const response = await createNewMessage(newMessage);

//       if (response.success) {
//         setMessage("");
//         setShowEmojiPicker(false);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const formatTime = (timestamp) => {
//     const now = moment();
//     const diff = now.diff(moment(timestamp), "days");

//     if (diff < 1) {
//       return `Today ${moment(timestamp).format("hh:mm A")}`;
//     } else if (diff === 1) {
//       return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
//     } else {
//       return moment(timestamp).format("MMM D, hh:mm A");
//     }
//   };

//   const getMessages = async () => {
//     try {
//       dispatch(showLoader());
//       const response = await getAllMessages(selectedChat._id);
//       dispatch(hideLoader());

//       if (response.success) {
//         setAllMessages(response.data);
//       }
//     } catch (error) {
//       dispatch(hideLoader());
//       toast.error(error.message);
//     }
//   };

//   const clearUnreadMessages = async () => {
//     try {
//       socket.emit("clear-unread-messages", {
//         chatId: selectedChat._id,
//         members: selectedChat.members.map((m) => m._id),
//       });
//       const response = await clearUnreadMessageCount(selectedChat._id);

//       if (response.success) {
//         allChats.map((chat) => {
//           if (chat._id === selectedChat._id) {
//             return response.data;
//           }
//           return chat;
//         });
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   function formatName(user) {
//     if (!user) return "";
//     let fname =
//       user.firstname?.at(0)?.toUpperCase() +
//       (user.firstname?.slice(1)?.toLowerCase() || "");
//     let lname =
//       user.lastname?.at(0)?.toUpperCase() +
//       (user.lastname?.slice(1)?.toLowerCase() || "");
//     return fname + " " + lname;
//   }

//   const sendImage = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader(file);
//     reader.readAsDataURL(file);

//     reader.onloadend = async () => {
//       sendMessage(reader.result);
//     };
//   };

//   useEffect(() => {
//     getMessages();
//     if (selectedChat?.lastMessage?.sender !== user._id) {
//       clearUnreadMessages();
//     }

//     socket.off("receive-message").on("receive-message", (message) => {
//       const selectedChat = store.getState().userReducer.selectedChat;
//       if (selectedChat._id === message.chatId) {
//         setAllMessages((prevmsg) => [...prevmsg, message]);
//       }

//       if (selectedChat._id === message.chatId && message.sender !== user._id) {
//         clearUnreadMessages();
//       }
//     });

//     socket.on("message-count-cleared", (data) => {
//       const selectedChat = store.getState().userReducer.selectedChat;
//       const allChats = store.getState().userReducer.allChats;

//       if (selectedChat._id === data.chatId) {
//         //UPDATING UNREAD MESSAGE COUNT IN CHAT OBJECT
//         const updatedChats = allChats.map((chat) => {
//           if (chat._id === data.chatId) {
//             return { ...chat, unreadMessageCount: 0 };
//           }
//           return chat;
//         });
//         dispatch(setAllChats(updatedChats));

//         //UPDATING READ PROPRTY IN MESSAGE OBJECT
//         setAllMessages((prevMsgs) => {
//           return prevMsgs.map((msg) => {
//             return { ...msg, read: true };
//           });
//         });
//       }
//     });

//     socket.on("started-typing", (data) => {
//       setData(data);
//       if (selectedChat._id === data.chatId && data.sender !== user._id) {
//         setIsTyping(true);
//         setTimeout(() => {
//           setIsTyping(false);
//         }, 2000);
//       }
//     });
//   }, [selectedChat]);

//   useEffect(() => {
//     const msgContainer = document.getElementById("main-chat-area");
//     if (msgContainer) {
//       msgContainer.scrollTop = msgContainer.scrollHeight;
//     }
//   }, [allMessages, isTyping]);

//   return (
//     <>
//       {selectedChat && (
//         <div className="app-chat-area">
//           <div className="app-chat-area-header">{formatName(selectedUser)}</div>

//           <div className="main-chat-area" id="main-chat-area">
//             {allMessages.map((msg) => {
//               const isCurrentUserSender = msg.sender === user._id;
//               return (
//                 <div
//                   className="message-container"
//                   style={
//                     isCurrentUserSender
//                       ? { justifyContent: "end" }
//                       : { justifyContent: "start" }
//                   }
//                   key={msg._id} // <-- ADD THIS LINE
//                 >
//                   <div>
//                     <div
//                       className={
//                         isCurrentUserSender
//                           ? "send-message"
//                           : "received-message"
//                       }
//                     >
//                       <div>{msg.text}</div>
//                       <div>
//                         {msg.image && (
//                           <img
//                             src={msg.image}
//                             alt="image"
//                             height="120"
//                             width="120"
//                           ></img>
//                         )}
//                       </div>
//                     </div>
//                     <div
//                       className="message-timestamp"
//                       style={
//                         isCurrentUserSender
//                           ? { float: "right" }
//                           : { float: "left" }
//                       }
//                     >
//                       {formatTime(msg.createdAt)}{" "}
//                       {isCurrentUserSender && msg.read && (
//                         <i
//                           className="fa fa-check-circle"
//                           aria-hidden="true"
//                           style={{ color: "#e74c3c" }}
//                         ></i>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             <div className="typing-indicator">
//               {isTyping &&
//                 selectedChat?.members
//                   .map((m) => m._id)
//                   .includes(data?.sender) && <i>typing...</i>}
//             </div>
//           </div>

//           {showEmojiPicker && (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 padding: "0px 20px",
//                 justifyContent: "right",
//               }}
//             >
//               <EmojiPicker
//                 style={{ width: "300px", height: "400px" }}
//                 onEmojiClick={(e) => setMessage(message + e.emoji)}
//               ></EmojiPicker>
//             </div>
//           )}
//           <div className="send-message-div">
//             <input
//               type="text"
//               className="send-message-input"
//               placeholder="Type a message"
//               value={message}
//               onChange={(e) => {
//                 setMessage(e.target.value);
//                 socket.emit("user-typing", {
//                   chatId: selectedChat._id,
//                   members: selectedChat.members.map((m) => m._id),
//                   sender: user._id,
//                 });
//               }}
//             />

//             <label htmlFor="file">
//               <i className="fa fa-picture-o send-image-btn"></i>
//               <input
//                 type="file"
//                 id="file"
//                 style={{ display: "none" }}
//                 accept="image/jpg,image/png,image/jpeg,image/gif"
//                 onChange={sendImage}
//               ></input>
//             </label>

//             <button
//               className="fa fa-smile-o send-emoji-btn"
//               aria-hidden="true"
//               onClick={() => {
//                 setShowEmojiPicker(!showEmojiPicker);
//               }}
//             ></button>
//             <button
//               className="fa fa-paper-plane send-message-btn"
//               aria-hidden="true"
//               onClick={() => sendMessage("")}
//             ></button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatArea;











// function ChatArea() {
//   const dispatch = useDispatch();
//   const { selectedChat, user } = useSelector((state) => state.userReducer);
//   const selectedUser = selectedChat?.members?.find((u) => u._id !== user._id);
//   const [message, setMessage] = useState("");
//   const [allMessages, setAllMessages] = useState([]);

//   const sendMessage = async () => {
//     try {
//       const Newmessage = {
//         chatId: selectedChat._id,
//         sender: user._id,
//         text: message,
//       };
//       dispatch(showLoader());

//       const response = await createNewMessage(Newmessage);
//       dispatch(hideLoader());

//       if (response.success) {
//         setMessage("");
//         // Optionally, refresh messages after sending
//         getMessage();
//       }
//     } catch (error) {
//       dispatch(hideLoader());
//       toast.error(error.message);
//     }
//   };

//   const formatTime = (timestamp) => {
//     const now = moment();
//     const diff = now.diff(moment(timestamp), 'days')

//     if (diff < 1) {
//       return 'Today ' + moment(timestamp).format("hh:mm A");
//     } else if (diff === 1) {
//       return 'Yesterday ' + moment(timestamp).format("hh:mm A");
//     } else {

//       return moment(timestamp).format("MMM D, hh:mm A");
//     }

//   };

//   const getMessage = async () => {
//     try {
//       dispatch(showLoader());
//       const response = await getAllMessages(selectedChat._id);
//       dispatch(hideLoader());

//       if (response.success) {
//         setAllMessages(response.data);
//       }
//     } catch (error) {
//       dispatch(hideLoader());
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (selectedChat) {
//       getMessage();
//     }
//   }, [selectedChat]);

//   return (
//     <>
//       {selectedChat && (
//         <div className="app-chat-area">
//           <div className="app-chat-area-header">
//             {selectedUser?.firstname + " " + selectedUser?.lastname}
//           </div>

//         <div className="main-chat-area">
//           {allMessages.map((msg) => {
//             const isCurrentUserSender = msg.sender === user._id;
//             return <div className="message-container" style={isCurrentUserSender ? {justifyContent: "end"} : {justifyContent: "start"}} >
//               <div>
//                   <div className={isCurrentUserSender ? "send-message" : "received-message" }>
//                     {msg.text}</div>
//                   <div className="message-timestamp" style={isCurrentUserSender ? {float: "right"} : {float: "left"}}>
//                     {formatTime(msg.createdAt)}
//                   </div>
//                   </div>

//               </div>

//           })}
//       </div>

//           <div className="send-message-div">
//             <input
//               type="text"
//               className="send-message-input"
//               placeholder="Type a message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               className="fa fa-paper-plane send-message-btn"
//               aria-hidden="true"
//               onClick={sendMessage}
//             ></button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatArea;











// import { useDispatch, useSelector } from "react-redux";
// import { createNewMessage, getAllMessages } from "../../apiCalls/Message";
// import { hideLoader, showLoader } from "../../redux/LoaderSlice";
// import toast from "react-hot-toast";
// import { useState, useEffect } from "react";
// import moment from "moment";
// import store from "../../redux/Store";
// import { setAllChats } from "../../redux/UserSlice";
// import EmojiPicker from "emoji-picker-react";
// import { clearUnreadMessageCount } from "../../apiCalls/Chat";

function ChatArea({ socket }) {
  const dispatch = useDispatch();
  const { selectedChat, user, allChats } = useSelector(
    (state) => state.userReducer
  );

  const selectedUser = selectedChat?.members.find((u) => u._id !== user._id);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [data, setData] = useState(null);

  // ✅ Send message
  const sendMessage = async (image) => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
        image: image,
      };

      socket.emit("send-message", {
        ...newMessage,
        members: selectedChat.members.map((m) => m._id),
        read: false,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      const response = await createNewMessage(newMessage);
      if (response.success) {
        setMessage("");
        setShowEmojiPicker(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Format timestamp
  const formatTime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), "days");

    if (diff < 1) return `Today ${moment(timestamp).format("hh:mm A")}`;
    if (diff === 1) return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    return moment(timestamp).format("MMM D, hh:mm A");
  };

  // ✅ Get all messages
  const getMessages = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllMessages(selectedChat._id);
      dispatch(hideLoader());

      if (response.success) {
        setAllMessages(response.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  // ✅ Clear unread messages
  const clearUnreadMessages = async () => {
    try {
      socket.emit("clear-unread-messages", {
        chatId: selectedChat._id,
        members: selectedChat.members.map((m) => m._id),
      });

      const response = await clearUnreadMessageCount(selectedChat._id);
      if (response.success) {
        const updatedChats = allChats.map((chat) =>
          chat._id === selectedChat._id ? response.data : chat
        );
        dispatch(setAllChats(updatedChats));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Format name safely (no NaN)
  function formatName(user) {
    if (!user) return "";
    const fname =
      (user.firstname?.charAt(0).toUpperCase() || "") +
      (user.firstname?.slice(1).toLowerCase() || "");
    const lname =
      (user.lastname?.charAt(0).toUpperCase() || "") +
      (user.lastname?.slice(1).toLowerCase() || "");
    return `${fname} ${lname}`.trim();
  }

  // ✅ Send image
  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      sendMessage(reader.result);
    };
  };

  // ✅ Socket listeners
  useEffect(() => {
    getMessages();
    if (selectedChat?.lastMessage?.sender !== user._id) {
      clearUnreadMessages();
    }

    socket.off("receive-message").on("receive-message", (message) => {
      const selectedChat = store.getState().userReducer.selectedChat;

      if (selectedChat._id === message.chatId) {
        setAllMessages((prevmsg) => [...prevmsg, message]);
      }

      if (selectedChat._id === message.chatId && message.sender !== user._id) {
        clearUnreadMessages();
      }
    });

    socket.on("message-count-cleared", (data) => {
      const selectedChat = store.getState().userReducer.selectedChat;
      const allChats = store.getState().userReducer.allChats;

      if (selectedChat._id === data.chatId) {
        const updatedChats = allChats.map((chat) =>
          chat._id === data.chatId ? { ...chat, unreadMessageCount: 0 } : chat
        );
        dispatch(setAllChats(updatedChats));

        setAllMessages((prevMsgs) =>
          prevMsgs.map((msg) => ({ ...msg, read: true }))
        );
      }
    });

    socket.on("started-typing", (data) => {
      setData(data);
      if (selectedChat._id === data.chatId && data.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });
  }, [selectedChat]);

  // ✅ Auto-scroll
  useEffect(() => {
    const msgContainer = document.getElementById("main-chat-area");
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [allMessages, isTyping]);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {formatName(selectedUser)}
          </div>

          <div className="main-chat-area" id="main-chat-area">
            {allMessages.map((msg) => {
              const isCurrentUserSender = msg.sender === user._id;
              return (
                <div
                  className="message-container"
                  style={{
                    justifyContent: isCurrentUserSender ? "end" : "start",
                  }}
                  key={msg._id || `${msg.sender}-${msg.createdAt}`} // ✅ unique key fix
                >
                  <div>
                    <div
                      className={
                        isCurrentUserSender ? "send-message" : "received-message"
                      }
                    >
                      {msg.text && <div>{msg.text}</div>}
                      {msg.image && (
                        <div>
                          <img
                            src={msg.image}
                            alt="chat-img"
                            height="120"
                            width="120"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className="message-timestamp"
                      style={{
                        float: isCurrentUserSender ? "right" : "left",
                      }}
                    >
                      {formatTime(msg.createdAt)}{" "}
                      {isCurrentUserSender && msg.read && (
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          style={{ color: "#e74c3c" }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ✅ Typing indicator */}
            <div className="typing-indicator">
              {isTyping &&
                selectedChat?.members
                  .map((m) => m._id)
                  .includes(data?.sender) && <i>typing...</i>}
            </div>
          </div>

          {/* ✅ Emoji Picker */}
          {showEmojiPicker && (
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0px 20px",
                justifyContent: "right",
              }}
            >
              <EmojiPicker
                style={{ width: "300px", height: "400px" }}
                onEmojiClick={(e) => setMessage(message + e.emoji)}
              />
            </div>
          )}

          {/* ✅ Input box */}
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                socket.emit("user-typing", {
                  chatId: selectedChat._id,
                  members: selectedChat.members.map((m) => m._id),
                  sender: user._id,
                });
              }}
            />

            <label htmlFor="file">
              <i className="fa fa-picture-o send-image-btn"></i>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={sendImage}
              />
            </label>

            <button
              className="fa fa-smile-o send-emoji-btn"
              aria-hidden="true"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            ></button>

            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={() => sendMessage("")}
            ></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatArea;
