import React from 'react';
import './App.css';
import './StartEndScreen.css';
class StartEndScreen extends React.Component{

    render(props){
        if (this.props.screen === "start"){
            return this.renderStart();
        }else{
            return this.renderEnd(props)
        }
    }

    renderStart = _ => {
        return(     
            <h1 className="inputText">Red goes first!</h1>
        )
    }

    renderEnd = props => {
        if (this.props.winner === "None") var message = "Game tied!";
        else message = this.props.winner + " wins!!";
        return(     
            <h1 className="inputText">{message}</h1>
        )
    }
}

export default StartEndScreen;