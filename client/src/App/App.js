import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../Chat/Chat.js";
import Video from "../Video/Video.js";
import { BrowserRouter as Router, Switch, Route, Link, Routes, BrowserRouter } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  //przetrzymuje wartosc wpisana w polu nickname
  const NickHandler = (event) => {
    setNickname(event.target.value);
  };

  //przetrzymuje wartosc wpisana w polu room
  const RoomHandler = (event) => {
    setRoom(event.target.value);
  };

  //przekazanie danych do serwera, poprzez wartosc "join", a kolejno wypisanie jej w backendzie
  const JoinRoom = () => {
    if (nickname !== ("") && room !== ("")) {
      socket.emit("join", room);
    } else {
      alert("Please enter all requirements")
      window.location.reload();
    }
  };

  const JoinVideo = () => {
    if (nickname !== ("") && room !== ("")) {
      socket.emit("joinV", room);
    } else {
      alert("Please enter all requirements")
      window.location.reload();
    }
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <div className="App">
            <h1>Chat and video application</h1>
            <div className='My-form'>
              <h3>Please enter your name:</h3>
              <input onChange={NickHandler}></input>
              
              <h3>Please enter room that you want to join:</h3>
              <input onChange={RoomHandler}></input>
              
              <Link to="/Chat" onClick={JoinRoom}>
                <button>Let's talk!</button>
              </Link>
              <Link to="/Video" onClick={JoinVideo}>
                <button>Video chat</button>
              </Link>
              </div>
            </div>
        }>
        </Route>
        <Route path="/Chat" element={<Chat socket={socket} nickname={nickname} room={room}/>}></Route>
        <Route path="/Video" element={<Video socket={socket} room={room}/>}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;