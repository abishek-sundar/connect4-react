import React, {useContext} from 'react';
import './App.css';
import { BoardContext } from './BoardContext.js';

function StartEndScreen(props) {
    const [tokenColor, setTokenColor, gameRunning, setGameRunning, winner, setWinner] = useContext(BoardContext);
    if (props.state === "start") {
        return renderStart(props);
    } else if (props.state === "end") {
        return renderEnd(props, winner);
    }
}

var renderStart = props => {
    return (
        <div className="startWrap">
            <h1 className="inputText">Red goes first!</h1>
            <button className="startButtons" onClick={() => props.goNext("board")} >Let's go!</button>
        </div>
    )
}


var renderEnd = (props,winner) => {
    if (winner === "None") var message = "Game tied!";
    else message = winner + " wins!!";
    return (
        <div className="startWrap">
            <h1 className="inputText">{message}</h1>
            <button className="startButtons" onClick={() => props.goNext("board")} >Let's go next!</button>
        </div>

    )
}
export default StartEndScreen;