import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminChat() {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("yourstorage"))
  );
  const [receiverId, setReceiverId] = useState(""); // store selected user id
  const [message, setMessage] = useState(""); // store current message
  const [chat, setChats] = useState([]); // store chat messages

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/chat/fetchMessage",
          {
            senderId: auth._id,
            receiverId: receiverId,
          }
        );
        console.log("Fetched messages for receiverId:", response.data);
        setChats(response.data);
        console.log("Fetched messages:", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/chat/fetchUsers"
        );
        setUsers(response.data);

        console.log(response.data, "users fetched from the backend ");
      } catch (err) {
        console.log("error in fetching users: ", err);
      }
    };
    fetchUsers();
    fetchMessages();
  }, [receiverId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const param = {
        message: message,
        receiverId: receiverId,
        senderId: auth._id,
      };

      const response = await axios.post(
        "http://localhost:4000/api/chat/send",
        param
      );
      console.log("Message sent:", response.data);

      setChats((prevChats) => [...prevChats, response.data]); // update chat state

      setMessage(""); // clear message field

      // Re-fetch messages after sending
      const updatedChat = await axios.post(
        "http://localhost:4000/chat/fetchMessage",
        {
          receiverId: receiverId,
        }
      );
      setChats(updatedChat.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", overflow: "auto", backgroundColor: "#1a1a1a" }}
    >
      <div
        style={{
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          color: "#fff",
        }}
      >
        {/* Navbar placeholder */}
      </div>

      <div className="d-flex flex-grow-1">
        {/* <Sidebar /> */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-grow-1 p-5 text-white"
          style={{
            background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* User List */}
            <div
              style={{
                width: "20%",
                height: "100%",
                backgroundColor: "#1f4037",
                overflowY: "auto",
              }}
            >
              {users.map((user, index) => (
                <div
                  onClick={() => setReceiverId(user.userid?._id)}
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                    color: "#fff",
                    backgroundColor:
                      receiverId === user._id ? "#2c5364" : "transparent",
                  }}
                >
                  {user.userid?.name}
                </div>
              ))}
            </div>

            {/* Chat Box */}
            <div
              style={{
                width: "80%",
                height: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "10px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#00000088",
                  borderRadius: "8px",
                }}
              >
                {chat.length === 0 && receiverId && (
                  <div
                    style={{
                      color: "#ccc",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    No messages yet. Start the conversation!
                  </div>
                )}
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf:
                        msg.senderId === auth._id ? "flex-end" : "flex-start",
                      backgroundColor:
                        msg.senderId === auth._id ? "#00b894" : "#dfe6e9",
                      color: msg.senderId === auth._id ? "#fff" : "#000",

                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      maxWidth: "60%",
                    }}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              {/* Input Field */}
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  borderTop: "1px solid #ccc",
                  backgroundColor: "#2c3e50",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-success ms-2" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
