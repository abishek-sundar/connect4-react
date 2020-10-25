import React, { useContext, useEffect } from 'react';
import './index.css';
import './App.css';
import Circle from './Circle.js'
import { BoardContext } from './BoardContext.js';
import update from 'immutability-helper'; // ES6

const axios = require('axios');


var nextColor = 1;
const directions = [
    [1, 0], //S
    [0, 1], //E
    [0, -1], //W
    [-1, 1], //NE
    [-1, -1], //NW
    [1, -1], //SW
    [1, 1] //SE
];
var countMoves = 0;
var tempToken = [];
var lastMoves = [0, 0];
function Board(props) {

    const [tokenColor, setTokenColor, gameRunning, setGameRunning, winner, setWinner, online, resetTokenColor] = useContext(BoardContext);
    var buttonPressed = false;

    const renderRow = _ => {
        var colTokens = [];
        for (var row = 0; row < 6; row++) {
            var rowTokens = [];
            for (var col = 0; col < 7; col++) {
                rowTokens.push(
                    <th key={row.toString() + col.toString()}>
                        <Circle color={getColor(row, col)} function={changeColor} col={col} hov={hoverColor} out={resethoverColor} />
                    </th>);
            }
            colTokens.push(<tr key={row.toString()}>{rowTokens}</tr>);
        }

        return colTokens;
    }

    const hoverColor = (col) => {
        var row = getLowestRow(col);
        buttonPressed = false;
        if (row < 6) {
            tempToken = update(tokenColor, {
                [row]: { [col]: { $set: nextColor } }
            });
            setTokenColor(tempToken);
        }
    }
    
    const resethoverColor = (col) => {
        if (!buttonPressed) {
            var row = getLowestRow(col);
            if (row < 6) {
                tempToken = update(tokenColor, {
                    [row]: { [col]: { $set: 0 } }
                });
                setTokenColor(tempToken);
            }
        }
    }

    const getColor = (row, col) => {
        switch (tokenColor[row][col]) {
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


    const getLowestRow = col => {
        for (var row = 5; row >= 0; row--) {
            if (tokenColor[row][col] <= 2) {
                return row;
            }
        }
        return 6;
    }
    
    const swapTurns = _ => {
        if (nextColor === 1) {
            nextColor = 2;
        } else {
            nextColor = 1;
        }
    }

    const isValid = (row, col) => {
        return (row >= 0 && col >= 0 && row < 6 && col < 7);
    }

    const findInARow = (row, col, token, dir) => {
        let count = 0;
        while (isValid(row, col)) {
            if (tempToken[row][col] === token) {
                count++;
            } else break;
            row += dir[0];
            col += dir[1];
        }
        return count;
    }

    const checkGameOver = (row, col, token) => {
        let colDown = findInARow(row, col, token, directions[0]);
        let rowAcross = findInARow(row, col, token, directions[1]) + findInARow(row, col, token, directions[2]) - 1;
        let mainDiag = findInARow(row, col, token, directions[4]) + findInARow(row, col, token, directions[6]) - 1;
        let countDiag = findInARow(row, col, token, directions[3]) + findInARow(row, col, token, directions[5]) - 1;
        if (Math.max(colDown, rowAcross, mainDiag, countDiag) >= 4) {
            setWinner(getWinningColor(token));
            return true;
        } else return false;
    }

    const getWinningColor = val => {
        if (val === 3) return "Red";
        else return "Yellow";
    }

    const changeColor = (col) => {
        var row = getLowestRow(col);
        buttonPressed = true;
        if (row < 6) {
            lastMoves = [row, col];
            tempToken = update(tokenColor, {
                [row]: { [col]: { $set: nextColor + 2 } }
            });
            setTokenColor(tempToken);
            if (checkGameOver(row, col, nextColor + 2) || ++countMoves === 42) setGameRunning(false);
            sendToNode();
            swapTurns();
        }
    }

    const sendToNode = _ => {
        let data = {
            row: lastMoves[0],
            col: lastMoves[1],
            gameRunning: gameRunning,
            winner: winner
        };
        console.log(data);
        axios.post("http://localhost:8080/", data).then(() => {
           //do something
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if (!gameRunning) {
            resetTokenColor();
            nextColor = 1;
            countMoves = 0;
            tempToken = [];
            sendToNode();
            props.goNext("end");
        }
        
    }, [gameRunning]);


    var tableData = renderRow();
    return (
            <table className="board">
                <tbody className="boardbody">
                    {tableData}
                </tbody>
            </table>


    )
}



export default Board;