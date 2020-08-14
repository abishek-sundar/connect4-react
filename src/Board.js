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
        this.directions = [
            [1,0], //S
            [0,1], //E
            [0,-1], //W
            [-1,1], //NE
            [-1,-1], //NW
            [1,-1], //SW
            [1,1] //SE
        ]
        this.gameRunning = true;
    }
    hoverColor = (col) => {
        var row = this.getLowestRow(col);
        if (row<6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = this.nextColor;
            this.setState({tokenColor: tempToken});
        }
    }
    resethoverColor = (col) => {
        var row = this.getLowestRow(col);
        if (row<6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = 0;
            this.setState({tokenColor: tempToken});
        }
    }

    getColor = (row,col) => {
        switch(this.state.tokenColor[row][col]){
            case 0:
                return "circle";
            case 1:
                return "circle hover-red";
            case 2:
                return "circle hover-yellow";
            case 3:
                return "circle circle-red";
            case 4: 
                return "circle circle-yellow";
        }
    }
    renderRow = _ => {
        var colTokens=[];
        for (var row = 0; row < 6; row++){
            var rowTokens = [];
            for (var col = 0; col < 7; col++){
                rowTokens.push(<th><Circle key={row*col} tokenColor={this.getColor(row,col)} function={this.changeColor} col={col} hov={this.hoverColor} out={this.resethoverColor}/></th>);
            }
        colTokens.push(<tr>{rowTokens}</tr>);
        }
        
        return colTokens;
    }

    getLowestRow = col => {
        for (var row = 5; row >= 0; row--){ 
            if (this.state.tokenColor[row][col] <= 2){
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

    isValid = (row,col) => {
        if (row >=0 && col >=0 && row < 6 && col < 7){
            return true;
        }else return false;
    }

    findInARow = (row,col,token,dir) => {
        let count = 0;
        while (this.isValid(row,col)){
            if (this.state.tokenColor[row][col] == token){
                count++;
            }else break;
            row += dir[0];
            col += dir[1];
        }
        return count;
    }

    checkGameOver = (row,col,token) => {
        // S=[1,0];E=[0,1];W=[0,-1];NE=[-1,1];NW=[-1,-1];SW=[1,-1];SE=[1,1]
        // NE + SW; NW + SE; E+W;
        
        var colDown = this.findInARow(row,col,token,this.directions[0]);
        var rowAcross = this.findInARow(row,col,token,this.directions[1]) + this.findInARow(row,col,token,this.directions[2]) - 1;
        var mainDiag = this.findInARow(row,col,token,this.directions[4]) + this.findInARow(row,col,token,this.directions[6]) - 1;
        var countDiag =  this.findInARow(row,col,token,this.directions[3]) + this.findInARow(row,col,token,this.directions[5]) - 1;
        if (Math.max(colDown,rowAcross,mainDiag,countDiag) == 4){
            return true;
        }else return false;
    }
    changeColor = col => {
        var row = this.getLowestRow(col);
        if (row < 6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = this.nextColor+2;
            this.setState({tokenColor: tempToken});
            this.gameRunning = !this.checkGameOver(row,col,this.nextColor+2);

            if (!this.gameRunning){
                console.log("Game over!!!!!!");
            }
            else this.swapTurns();
            
        }
    }
    render(){ 
       var tableData=this.renderRow();
        return (
            <table className="board">
                <tbody>
                    {tableData}
                </tbody>
            </table>
        )
    }
}

export default Board;