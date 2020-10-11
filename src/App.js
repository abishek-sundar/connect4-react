import React, { useState } from 'react';
import './App.css';
import Board from './Board.js';
import StartEndScreen from './StartEndScreen.js';
import {BoardProvider} from "./BoardContext.js";

var hasWon = "None";
function App() {
	const [state, setState] = useState("input");
	var getGameData = winner => {
		setState("over");
		hasWon = winner;
	}
	if (state === "input") {
		console.log(state);
		return (
				<StartEndScreen screen="start" goNext={setState}/>
		);
	} else if (state === "board") {
		return (
			<body>
				<BoardProvider>
					<Board sendData={getGameData} />
				</BoardProvider>
			</body>
		);
	} else if (state === "over"){
		return (
			<StartEndScreen screen="end" winner={hasWon} goNext={setState}/>
		)
	}

}

export default App;
