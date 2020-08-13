import React, { useState } from 'react';
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
       this.nextColor = 1;
    }

    getColor = (row,col) => {
        switch(this.state.tokenColor[row][col]){
            case 0:
                return "circle";
            case 1:
                return "circle circle-red";
            case 2:
                return "circle circle-blue";
        }
    }
    renderRow = _ => {
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

    getLowestRow = col => {
        for (var row = 5; row >= 0; row--){ 
            if (this.state.tokenColor[row][col] == 0){
                return row;
            }
        }
        return 6;
    }
    swapTurns = _ => {
        if (this.nextColor==1){
            this.nextColor=2;
        }else{
            this.nextColor=1;
        }
    }
    changeColor = col => {
        var row = this.getLowestRow(col);
        console.log(row, col);
        if (row < 6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = this.nextColor;
            this.swapTurns();
            this.setState({tokenColor: tempToken});
        }
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