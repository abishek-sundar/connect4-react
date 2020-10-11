import React, { useState } from 'react';
import './App.css';
import Board from './Board.js';
import StartEndScreen from './StartEndScreen.js';
import {BoardProvider} from "./BoardContext.js";

var hasWon = "None";
function App() {
	const [state, setState] = useState("input");
	// var changeState = x => {
	// 	console.log(state);
	// 	setState(x);
	// }

	var getGameData = winner => {
		// console.log(state);
		hasWon = winner;
	}
	// console.log(state);
	// setTimeout((() => changeState("board")), 10000);
	if (state === "input") {
		console.log(state);
		return (
			<body>
				<StartEndScreen screen="start" goNext={setState}/>
			</body>
		);
	} else if (state === "board") {
		return (
			<BoardProvider>
				<body>	
					<Board endFunc={setState} sendData={getGameData} />
				</body>
			</BoardProvider>

		);
	} else {
		
		return (
			<body>
				<StartEndScreen screen="end" winner={hasWon} />
			</body>
		)
	}

}

export default App;
