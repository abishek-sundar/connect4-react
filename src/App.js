import React, { useState } from 'react';
import './App.css';
import Board from './Board.js'
import StartEndScreen from './StartEndScreen.js'


var hasWon = "None";
function App() {
  const [state,setState] = useState("input");
  var changeState = x => {
    setState(x);
  }
  
  var getGameData = winner => {
	console.log("haswon set");
	hasWon = winner;
  }

  setTimeout((() => changeState("board")), 1000);
  if (state === "input"){
    return (
      <body>
        <StartEndScreen screen="start"/>
      </body>
    );
  }else if (state === "board"){
    return (
      <body>
        <Board endFunc = {changeState} sendData={getGameData}/>
      </body>
    );
  }else {
	  console.log("haswon used");
	  return (
		  <body>
			  <StartEndScreen screen="end" winner={hasWon}/>
		  </body>
	  )
  }

}

export default App;
