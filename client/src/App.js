import { useEffect, useState } from 'react';
import io from "socket.io-client";
import './App.css';

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input type="text" placeholder="message.." onChange={(e)=>setMessage(e.target.value)}/>
      <button className='button' onClick={sendMessage}>Send Message</button>
      <input
      type="text"
        placeholder="room no : "
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button className='button button2' onClick={joinRoom}> Join room</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
