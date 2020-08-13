import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board.js'


function App() {
  return (
    <div>
      <h1>
        Connect 4!
      </h1>
    <Board />
    </div>
  );
}

export default App;
