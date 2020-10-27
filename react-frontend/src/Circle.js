import React from "react";
import "./App.css";

function Circle(props) {
  return (
    <button
      className={props.color}
      onMouseOver={() => props.hov(props.col)}
      onMouseOut={() => props.out(props.col)}
      onClick={() => props.function(props.col)}
    />
  );
}

export default Circle;
