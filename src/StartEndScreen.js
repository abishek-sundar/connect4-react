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
            <button onClick={() => props.goNext("board")} >Single player</button>
            <button onClick={() => props.goNext("board")} >Multiplayer</button>
        </div> 

    )
}

// var inputButton = _ => {
//     console.log("button press");
// }



var renderEnd = props => {
    if (this.props.winner === "None") var message = "Game tied!";
    else message = this.props.winner + " wins!!";
    return(     
        <h1 className="inputText">{message}</h1>
    )
}
export default StartEndScreen;