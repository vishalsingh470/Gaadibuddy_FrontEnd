import React from "react";
import "./BoxComp.css";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
let BoxComponent = (props) => {
  return (
    <div className="BoxButtonContainer">
      <div
        className={
          width.matches
            ? "BoxButtonContainerHeading"
            : props.category === "PLATINUM"
            ? "BoxButtonContainerHeading"
            : "BoxButtonContainerHeadingNormal"
        }
      >
        <h1>{props.category}</h1>
      </div>
      <div
        className={
          props.category === "PLATINUM"
            ? "textContainerBoxPlatinum"
            : "textContainerBox"
        }
      >
        {props.category === "ONE TIME" ||
        props.category === "SILVER" ||
        props.category === "GOLD" ||
        props.category === "PLATINUM" ? (
          <div>
            <ul>
              {props.text.map((points) => (
                <li>
                  <p>{points}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{props.text}</p>
        )}
      </div>

      <div
        className={
          width.matches
            ? "BoxButtonContainerBottom"
            : props.category === "PLATINUM"
            ? "BoxButtonContainerBottom"
            : "BoxButtonContainerBottomNormal"
        }
      >
        <button onClick={() => props.togglePress(props.category)}>BOOK</button>
      </div>
    </div>
  );
};
export default BoxComponent;
