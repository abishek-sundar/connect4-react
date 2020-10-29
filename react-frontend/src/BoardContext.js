import React, { useState, createContext } from "react";

export const BoardContext = createContext();
export const BoardProvider = (props) => {
  let boardDefault = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const [tokenColor, setTokenColor] = useState(boardDefault);
  const [gameRunning, setGameRunning] = useState(true);
  const [winner, setWinner] = useState("None");
  var online = false;
  const nodeURL = "http://localhost:8080";
  const resetTokenColor = (_) => {
    setTokenColor(boardDefault);
  };
  return (
    <BoardContext.Provider
      value={{
        tokenColor,
        setTokenColor,
        gameRunning,
        setGameRunning,
        winner,
        setWinner,
        online,
        resetTokenColor,
        nodeURL,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
};
