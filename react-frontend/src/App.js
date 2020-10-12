import React, { useState } from 'react';
import './App.css';
import Board from './Board.js';
import StartEndScreen from './StartEndScreen.js';
import {BoardProvider} from "./BoardContext.js";

function App() {
	const [state, setState] = useState("start");
	if (state === "start" || state === "end"){
		return (
			<BoardProvider>
				<StartEndScreen state={state} goNext={setState}/>
			</BoardProvider>
		)
	} else if (state === "board") {
		return (
			<BoardProvider>
				<Board goNext={setState}/>
			</BoardProvider>
		);
	} else return "<h1>Unknown state</h1>"
}

export default App;
