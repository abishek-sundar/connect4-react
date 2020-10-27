import React, { useContext, useState } from "react";
import "./App.css";
import { BoardContext } from "./BoardContext.js";
const axios = require("axios");
function StartEndScreen(props) {
  var loginClicked = (event) => {
    let data = {
      user: user,
      password: password,
    };
    axios
      .post(`${nodeURL}/signin`, data)
      .then(() => {
        //do something
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(password);
  };

  const handleUsernameChange = (event) => setUser(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const renderStart = (props) => {
    return (
      <div className="startWrap">
        <h1 className="inputText">Red goes first!</h1>
        <button className="startButtons" onClick={() => props.goNext("board")}>
          Local Multiplayer
        </button>
        {/* <button className="startButtons" onClick={() => {online = true; props.goNext("online");}} >Online Multiplayer</button> */}
        <form onSubmit={loginClicked}>
          <label>
            username:{" "}
            <input type="text" name="name" onChange={handleUsernameChange} />
            password:{" "}
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  };
  const goNextButton = (resetAndReturn) => {
    setWinner("None");
    setGameRunning("True");
    resetAndReturn("board");
  };

  const renderEnd = (props) => {
    if (winner === "None") var message = "Game tied!";
    else message = winner + " wins!!";
    return (
      <div className="startWrap">
        <h1 className="inputText">{message}</h1>
        <button
          className="startButtons"
          onClick={() => goNextButton(props.goNext)}
        >
          Let's go next!
        </button>
      </div>
    );
  };

  const [setGameRunning, winner, setWinner, nodeURL] = useContext(BoardContext);
  const [user, setUser] = useState("username");
  const [password, setPassword] = useState("password");
  if (props.state === "start") {
    return renderStart(props);
  } else if (props.state === "end") {
    return renderEnd(props);
  }
}

export default StartEndScreen;
