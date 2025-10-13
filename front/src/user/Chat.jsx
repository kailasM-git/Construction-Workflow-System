import { useState, useEffect } from "react";
import axios from "axios";
import Navebar from "./Navebar";

function Chat() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("yourstorage"))
  );
  console.log(auth, "from the localStorage");
  const [message, setMessage] = useState("");
  const [chat, setChats] = useState([]);

  // Send a new message
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const response = await axios.post("http://localhost:4000/api/chat/send", {
        senderId: auth.userid,
        message: message,
      });

      console.log("Message sent:", response.data);
      setChats((prevChats) => [...prevChats, response.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch all messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      if (!auth.userid) return;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/chat/fetchMessage",
          {
            senderId: auth.userid,
          }
        );
        console.log("Fetched messages for userId:", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <>
    <Navebar/>
    <div>

      {/* <Userheader/> */}
      <section
        className="signup spad d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          color: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
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
              maxHeight: "100vh",
              overflowY: "scroll",
            }}
          >
            {chat.length === 0 && (
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
                    msg.senderId === auth.userid ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.senderId === auth.userid ? "#00b894" : "#dfe6e9",
                  color: msg.senderId === auth.userid ? "#fff" : "#000",
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
      </section>
    </div>
    </>
  );
}

export default Chat;
