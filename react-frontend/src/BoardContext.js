import React, { useState, createContext } from 'react';

export const BoardContext = createContext();
export const BoardProvider = props => {
    const [tokenColor, setTokenColor] = useState(
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]
    );
    const [gameRunning, setGameRunning] = useState(true);
    const [winner, setWinner] =useState("None");
    
    
    return (
        <BoardContext.Provider value={[tokenColor, setTokenColor, gameRunning, setGameRunning, winner, setWinner]}>
            {props.children}
        </BoardContext.Provider>
    );
}