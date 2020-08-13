import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Circle from './Circle.js'

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tokenColor: 
            [
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]
        };
    }

    getColor(row,col){
        switch(this.state.tokenColor[row][col]){
            case 0:
                return "circle";
            case 1:
                return "circle circle-red";
            case 2:
                return "circle circle-blue";
        }
    }
    renderRow(){
        var colTokens=[];
        for (var row = 0; row < 6; row++){
            var rowTokens = [];
            for (var col = 0; col < 7; col++){
                rowTokens.push(<th><Circle key={row*col} tokenColor={this.getColor(row,col)} function={this.changeColor} col={col} /></th>);
            }
        colTokens.push(<tr>{rowTokens}</tr>);
        }
        
        return colTokens;
    }

    changeColor(col){
        var colStr = col.toString();
        return function(){
            console.log({colStr});
        };
    }
    render(){
        
       var tableData=this.renderRow();
        return (
            <table>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        )
    }
}

export default Board;