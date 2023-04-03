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
  const [isGameOver, setIsGameOver] = useState(false)
  const [isRoomFull, setIsRoomFull] = useState(false)

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
    socket.on("serverFull", () => {
      socket.disconnect()
      alert('Server full try again later')
    })
    // socket.on("gameOver", () => {
    //   setIsGameOver(true)
    //   setIsLoading(true)
    // })

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

  console.log(isGameOver)

  return (
    <div className="App">
      <h1>Hi</h1>{" "}
      {isLoading ? (
        <h1>Waiting for other player ...</h1>
      ) : (
        <div>
          <GameWindow
            socket={socket}
            id={id}
            allIds={allIds}
            setIsGameOver={setIsGameOver}
            isGameOver={isGameOver}
          />

        </div>
      )}
    </div>
  );
}

export default App;
