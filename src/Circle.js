import React from 'react';
import './App.css';

class circle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            class: "circle"
        };
    }

    render(props){
        return(     
            <button className={this.props.tokenColor} onMouseOver={() => this.props.hov(this.props.col)} onMouseOut={() => this.props.out(this.props.col)} onClick={() => this.props.function(this.props.col)}>
            
            </button>
        )
    }
}

export default circle;
