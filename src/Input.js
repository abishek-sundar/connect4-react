import React from 'react';
import './App.css';
import './Input.css';
class Input extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(     
            <h1 className="inputText">Red goes first!</h1>
        )
    }
}

export default Input;