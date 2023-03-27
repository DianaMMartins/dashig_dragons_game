import "./App.css";
import { socket } from "./socket";
import { useState, useEffect } from "react";
// import { connect } from 'http2';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
      setIsConnected(true);
    }
    function onDisconnect() {
      console.log('disconnect');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

  function disconnect() {
    socket.disconnect();
    console.log("disconnect", socket.connected);
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};

export default App;