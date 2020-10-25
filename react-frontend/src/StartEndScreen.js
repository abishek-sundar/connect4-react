import React, {useContext, useState }  from 'react';
import './App.css';
import { BoardContext } from './BoardContext.js';
const axios = require('axios');
const saltRounds = 10;
function StartEndScreen(props) {

    var loginClicked = event => {
        // bcrypt.hash(password, saltRounds, function(err, hash) {
        //     let data = {
        //         user: user,
        //         password: hash
        //     };
        //     console.log(data);
        //     axios.post("http://localhost:8080/signin", data).then(() => {
        //        //do something
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
        // });
        console.log(password);
        
    }
    
    const handleUsernameChange = event => setUser(event.target.value);
    
    const handlePasswordChange = event => setPassword(event.target.value);
    
    

    const renderStart = (props) => {
        return (
            <div className="startWrap">
                <h1 className="inputText">Red goes first!</h1>
                <button className="startButtons" onClick={() => props.goNext("board")} >Local Multiplayer</button>
                {/* <button className="startButtons" onClick={() => {online = true; props.goNext("online");}} >Online Multiplayer</button> */}
                <form onSubmit={loginClicked}>
                    <label>
                        username: <input type="text" name="name" onChange={handleUsernameChange}/>
                        password: <input type="password" name="password" onChange={handlePasswordChange}/>
                    </label>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
    const goNextButton = resetAndReturn => {
        setWinner("None");
        setGameRunning("True");
        resetAndReturn("board");
    }

    const renderEnd = (props) => {
        if (winner === "None") var message = "Game tied!";
        else message = winner + " wins!!";
        return (
            <div className="startWrap">
                <h1 className="inputText">{message}</h1>
                <button className="startButtons" onClick={() => goNextButton(props.goNext)} >Let's go next!</button>
            </div>
    
        )
    }

    const [tokenColor, setTokenColor, gameRunning, setGameRunning, winner, setWinner, online, resetTokenColor] = useContext(BoardContext);
    const [user,setUser] = useState("username");
    const [password,setPassword] = useState("password");
    if (props.state === "start") {
        return renderStart(props);
    } else if (props.state === "end") {
        return renderEnd(props);
    }
}







export default StartEndScreen;