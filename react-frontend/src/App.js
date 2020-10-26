import React, { useState } from "react";
import "./App.css";
import Board from "./Board.js";
import StartEndScreen from "./StartEndScreen.js";
import { BoardProvider } from "./BoardContext.js";

function App() {
  const [state, setState] = useState("start");
  switch (state) {
    case "start":
    case "end":
      return (
        <BoardProvider>
          <StartEndScreen state={state} goNext={setState} />
        </BoardProvider>
      );
      break;
    case "board":
      return (
        <BoardProvider>
          <Board goNext={setState} />
        </BoardProvider>
      );
      break;
    default:
      console.log(state);
      return <h1>{state}</h1>;
      break;
  }
}

export default App;
