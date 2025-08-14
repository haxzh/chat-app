
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessages } from "../../apiCalls/Message";
import { hideLoader, showLoader } from "../../redux/LoaderSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import moment from "moment";

function ChatArea() {
  const dispatch = useDispatch();
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat?.members?.find((u) => u._id !== user._id);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const Newmessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());

      const response = await createNewMessage(Newmessage);
      dispatch(hideLoader());

      if (response.success) {
        setMessage("");
        // Optionally, refresh messages after sending
        getMessage();
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  const formatTime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), 'days')

    if (diff < 1) {
      return 'Today ' + moment(timestamp).format("hh:mm A");
    } else if (diff === 1) {
      return 'Yesterday ' + moment(timestamp).format("hh:mm A");
    } else {

      return moment(timestamp).format("MMM D, hh:mm A");
    }

  };



  const getMessage = async () => {
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

  useEffect(() => {
    if (selectedChat) {
      getMessage();
    }
  }, [selectedChat]);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser?.firstname + " " + selectedUser?.lastname}
          </div>

        <div className="main-chat-area">
          {allMessages.map((msg) => {
            const isCurrentUserSender = msg.sender === user._id;
            return <div className="message-container" style={isCurrentUserSender ? {justifyContent: "end"} : {justifyContent: "start"}} >
              <div>
                  <div className={isCurrentUserSender ? "send-message" : "received-message" }>
                    {msg.text}</div>
                  <div className="message-timestamp" style={isCurrentUserSender ? {float: "right"} : {float: "left"}}>
                    {formatTime(msg.createdAt)}
                  </div>
                  </div>
                  
              </div>

          })}
      </div>
        
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatArea;


































// import { useDispatch, useSelector } from "react-redux";
// import { createNewMessage, getAllMessages } from "../../apiCalls/Message";
// import { hideLoader, showLoader } from "../../redux/LoaderSlice";
// import toast from "react-hot-toast";
// import { useState , useEffect} from "react";


// function ChatArea() {
//   const dispatch = useDispatch();
//   const { selectedChat, user } = useSelector((state) => state.userReducer);
//   const selectedUser = selectedChat.members.find((u) => u._id !== user._id);
//   const [message, setMessage] = useState(" ");
//   const [allMessages, setAllMessages] = useState([]);

//   const sendMessage = async () => {
//     try {
//       const Newmessage = {
//         chat: selectedChat._id,
//         sender: user._id,
//         text: message,
//       };
//       dispatch(showLoader());

//       const response = await createNewMessage(Newmessage);
//       dispatch(hideLoader());
      
//       if (response.success) {
//         setMessage(" ");
//       }
//     } catch (error) {
//       dispatch(hideLoader());
//       toast.error(error.message);
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
//     getMessages();
//   }, [selectedChat]);

//   return (
//     <>
//       {selectedChat && (
//         <div class="app-chat-area">
//           <div class="app-chat-area-header">
//             {selectedUser.firstname + " " + selectedUser.lastname}
//           </div>
//           <div className="main-chat-area">CHAT AREA</div>
//           <div className="send-message-div">
//             <input
//               type="text"
//               className="send-message-input"
//               placeholder="Type a message"
//               value= {message}
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


