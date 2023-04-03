import "./App.css";
import { socket } from "./socket";
import { useState, useEffect } from "react";
import GameWindow from "./Components/GameWindow.jsx";

function App() {
  // const [enemiesData, setEnemiesData] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [allIds, setAllIds] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnect");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // socket.on("getEnemiesGroup", (enemiesGroupData) => {
    //   console.log(enemiesGroupData);

    //   setEnemiesData(enemiesGroupData);
    // });

    // return () => {
    // socket.off("connect", onConnect);
    // socket.off("disconnect", onDisconnect);
    // };
    socket.on("assignId", (clientId) => {
      console.log(clientId);
      setId(clientId);
    });

    socket.on("sendAllIds", (playerIds) => {
      setIsLoading(false);
      setAllIds(playerIds);
      console.log(id, allIds);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hi</h1>{" "}
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <GameWindow
          socket={socket}
          id={id}
          allIds={allIds}
        />
      )}
    </div>
  );
}

export default App;
