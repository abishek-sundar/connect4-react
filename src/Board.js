import React from 'react';
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
        this.buttonPressed = false;
        this.winner = "None";
        this.countMoves = 0;
    }
    hoverColor = (col) => {
        var row = this.getLowestRow(col);
        this.buttonPressed = false;
        if (row<6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = this.nextColor;
            this.setState({tokenColor: tempToken});
        }
    }
    resethoverColor = (col) => {
        if (!this.buttonPressed){
            var row = this.getLowestRow(col);
            if (row<6){
                var tempToken = this.state.tokenColor;
                tempToken[row][col] = 0;
                this.setState({tokenColor: tempToken});
            }
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
            default:
                return "circle";
        }
    }
    renderRow = _ => {
        var colTokens=[];
        for (var row = 0; row < 6; row++){
            var rowTokens = [];
            for (var col = 0; col < 7; col++){
                rowTokens.push(<th key={row.toString()+col.toString()}><Circle tokenColor={this.getColor(row,col)} function={this.changeColor} col={col} hov={this.hoverColor} out={this.resethoverColor}/></th>);
            }
            colTokens.push(<tr key={row.toString()}>{rowTokens}</tr>);
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
        if (this.nextColor===1){
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
            if (this.state.tokenColor[row][col] === token){
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
        if (Math.max(colDown,rowAcross,mainDiag,countDiag) >= 4){
            this.winner = this.getWinningColor(token);
            return true;
        }else return false;
    }
    
    getWinningColor = val => {
        if (val === 3) return "Red";
        else return "Yellow";
    }
    changeColor = col => {
        var row = this.getLowestRow(col);
        this.buttonPressed=true;
        if (row < 6){
            var tempToken = this.state.tokenColor;
            tempToken[row][col] = this.nextColor+2;
            this.setState({tokenColor: tempToken});
            this.gameRunning = !this.checkGameOver(row,col,this.nextColor+2)
            if (++this.countMoves === 42) this.gameRunning = false;
            if (this.gameRunning) this.swapTurns();
            else {
                this.props.sendData(this.winner);
                this.props.endFunc("end");
            }
            console.log(this.countMoves);
            
        }
    }
    render(props){ 
        var tableData=this.renderRow();
        // if (!this.gameRunning){
        //     return;
        // }
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