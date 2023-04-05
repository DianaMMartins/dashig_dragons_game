import "./App.css";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import GameWindow from "./Components/GameWindow.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [allIds, setAllIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("serverFull", () => {
      socket.disconnect();
      alert("Server full try again later");
    });

    socket.on("assignId", (clientId) => {
      setId(clientId);
    });

    socket.on("sendAllIds", (playerIds) => {
      setIsLoading(false);
      setAllIds(playerIds);
    });

    return () => {
      socket.off("serverFull");
      socket.off("assignId");
      socket.off("sendAllIds");
    };
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      setIsConnected(true);
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [isConnected]);

  return (
    <div className="App">
      <img
        src={require("./assets/wizard1.png")}
        alt="mighty wizard"
        className="wizard"
        width="50px"
      />
      {isLoading ? (
        <>
          <h1>Waiting for other player ...</h1>
        </>
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
