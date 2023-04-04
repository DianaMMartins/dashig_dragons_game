import "./App.css";
import { socket } from "./socket";
import { useState, useEffect } from "react";
import GameWindow from "./Components/GameWindow.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [allIds, setAllIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

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
  }, []);

  function handleClick() {
    socket.emit("join");
  }

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
          <button onClick={handleClick}>JOIN</button>
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
