import React from "react";
// import { findByLabelText } from '@testing-library/react';
import { Link } from "react-router-dom";
import "./ImgComponents.css";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
function ImgComponent(props) {
  console.log(props,"in IMGCOMP")
  return (
    <div className="imagecontainer">
      <a href={`services/${props.imgComponent.servicePageLink}`}>
        <img
          className="imagefield"
          src={props.imgComponent.imgSrc}
          alt="slide-img"
        ></img>
      </a>

      <h3
        style={
          width.matches
            ? {
                color: props.imgComponent.color,
                marginLeft: props.imgComponent.leftAdjustment,
              }
            : {
                color: props.imgComponent.color,
                marginLeft: props.imgComponent.leftAdjustment,
                marginTop: props.imgComponent.mobileTopAdjustment,
                left: props.imgComponent.mobileLeftAdjustment,
              }
        }
        className="slidertext"
      >
        {props.imgComponent.description}
      </h3>
      <p
        style={
          width.matches
            ? {
                color: props.imgComponent.subColor,
                fontFamily: props.imgComponent.fontFamily,
                left: props.imgComponent.desktopLeftAdjustmentSub,
              }
            : {
                position: "relative",
                color: props.imgComponent.subColor,
                fontFamily: props.imgComponent.fontFamily,
                top: props.imgComponent.mobileTopAdjustmentSub,
                bottom: props.imgComponent.mobileDownAdjustment,
                left: props.imgComponent.mobileLeftAdjustmentSub,
                width: props.imgComponent.mobileWidth,
              }
        }
        className="sliderSubText"
      >
        {props.imgComponent.details}
      </p>
    </div>
  );
}

export default ImgComponent;
