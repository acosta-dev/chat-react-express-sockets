import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://127.0.0.1:4000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{
    body: "welcome to chat room!",
    from: "testuser"
  }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message);
    setMessage("");
    e.target.setValue = message;
  };

  useEffect(() => {
    const reciveMessage = (message) => {
      console.log(message)
    };
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
