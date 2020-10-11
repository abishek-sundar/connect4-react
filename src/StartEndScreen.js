import React from 'react';
import './App.css';
import './StartEndScreen.css';

function StartEndScreen(props) {
    
    if (props.screen === "start"){
        return renderStart(props);
    }else{
        return renderEnd(props);
    }
}

var renderStart = props => {
    return(    
        <div>
            <h1 className="inputText">Red goes first!</h1>
            <button onClick={() => props.goNext("board")} >Let's go!</button>
        </div> 
    )
}


var renderEnd = props => {
    if (props.winner === "None") var message = "Game tied!";
    else message = props.winner + " wins!!";
    return(     
        <div>
            <h1 className="inputText">{message}</h1>
            <button onClick={() => props.goNext("board")} >Let's go next!</button>
        </div>

    )
}
export default StartEndScreen;