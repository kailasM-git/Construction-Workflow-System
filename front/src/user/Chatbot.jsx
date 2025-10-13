import { useState } from "react";

// headers: {
//           Authorization: `Bearer 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`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
       headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for a web application called 'Construction Workflow Automation System'. Help users navigate the system based on their role: Client, Consultancy, Contractor, Sub-contractor, or Supplier. Guide them step-by-step and ask follow-up questions when needed`,
            },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input.trim() },
          ],
          max_tokens: 100,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;

      setMessages((prev) => [...prev, { sender: "bot", text: reply || "..." }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops, something broke." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* <button
        className="btn btn-light position-fixed bottom-0 start-0 m-4 shadow rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          zIndex: 999,
          backgroundColor: "#0d6efd",
          color: "#fff",
        }}
        onClick={() => setOpen(!open)}
      >
        💬🛠️
      </button> */}


      <button
  className="btn btn-light position-fixed bottom-0 start-0 m-4 shadow rounded-circle d-flex align-items-center justify-content-center"
  style={{
    width: "60px",
    height: "60px",
    zIndex: 999,
    backgroundColor: "#34e70cff", // Bootstrap green
    color: "#fff",
    fontSize: "24px",
  }}
  onClick={() => setOpen(!open)}
  title="Manage Tasks"
>
  🏠
</button>


      {open && (
        <div
          className="position-fixed bottom-0 start-0 m-4 shadow-lg"
          style={{
            width: "340px",
            height: "480px",
            borderRadius: "15px",
            overflow: "hidden",
            background: "#fff",
            zIndex: 1060,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="px-3 py-2 text-white"
            style={{
              backgroundColor: "#34e70cff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Chat with us</strong>
            <button
              className="btn btn-sm btn-outline text-light"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div
            className="flex-grow-1 p-3 d-flex flex-column gap-2"
            style={{ background: "#f8f9fa", overflowY: "auto" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? " text-white align-self-end"
                    : "bg-light text-dark align-self-start"
                }`}
                style={{ maxWidth: "75%",
                          backgroundColor: "#34e70cff",
                 }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                className="bg-light text-muted p-2 rounded align-self-start"
                style={{ maxWidth: "75%" }}
              >
                Thinking...
              </div>
            )}
          </div>

          <div className="p-2 border-top bg-white d-flex gap-2">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="btn  rounded-pill px-3"
               style={{
    backgroundColor: "#34e70cff", // Bootstrap green
    color: "#fff",
      }}
              onClick={handleSend}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
