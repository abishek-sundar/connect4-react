import React from 'react';
import './App.css';
import Board from './Board.js'

class circle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            class: "circle"
        };
    }

    // increment = _ => console.log("You pressed red!");
    buttonclicked = _ => {
        this.setState({class: this.state.class += " red"});
        console.log(this.state.class);
    };
    render(props){
        return(     
            <button className={this.props.tokenColor} onClick={() => this.props.function(this.props.col)}>
            
            </button>
        )
    }
}

export default circle;
