import React from "react";
import "./CircRingComp.css";

export const CircularTextComp = (props) => {
  return (
    <div
      className="circularcompwithtext"
      style={{ backgroundColor: props.styles.backgroundColor }}
    >
      <div className="homeimagecontainer">
        <img src={props.imgUrl} alt={props.imgUrl}></img>
      </div>
      <div className="header">
        <h1
          style={
            props.heading === "Reliability"
              ? { paddingTop: "0.5%", color: "#024126" }
              : { paddingTop: "0.5%" }
          }
        >
          {props.heading}
        </h1>
      </div>
      <div className="paragraphCircText">
        <p style={props.styles}>{props.paragraph}</p>
      </div>
    </div>
  );
};

export const CircularTextCompGradient = (props) => {
  return (
    <div
      className="circularcompwithgradient"
      style={{
        background: props.styles.background,
        border: `1px solid ${props.styles.borderColor}`,
        textAlign: 'center',
      }}
    >
      <div className="homeimagecontainer">
        <img src={props.imgUrl} alt={props.imgUrl}></img>
      </div>
      <div className="contentAboutUs">
        <div className="header">
          <h1>{props.heading}</h1>
        </div>
        <div className="paragraph">
          <p style={{textAlign:'center'}}>{props.paragraph}</p>
        </div>
      </div>
    </div>
  );
};
 
