import React from 'react';
import './App.css';


class circle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:0
        };
    }

    increment = _ => console.log("You pressed red!");
    render(){
        return(     
            <button className='circle' onClick={this.increment}>
            
            </button>
        )
    }
}

export default circle;
