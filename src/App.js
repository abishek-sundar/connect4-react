import React, { useState } from 'react';
import './App.css';
import Board from './Board.js'
import Input from './Input.js'
// var state = "input";


function App() {
  const [state,setState] = useState("input");
  var changeState = _ => {
    setState("board");
  }
  setTimeout(changeState, 5000);
  if (state == "input"){
    return (
      <body>
        <Input />
      </body>
    );
  }else{
    return (
      <body>
        <Board />
      </body>
    );
  }

}

export default App;