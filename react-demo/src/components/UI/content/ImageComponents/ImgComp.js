import React from "react";
import "./ImgComp.css";
const MainImage =(props)=> {
//  const width = { matches: window.matchMedia("(min-width: 768px)").matches };

  
    console.log(props.type);
    return (
      <div className="imgcontainer">
       
        <img
          height="100%"
          width="100%"
          className={props.minHeight ? "img_mobile" : "img"}
          src={props.type}
          alt={props.type}
        ></img>
      </div>
    );
  
}
export default MainImage;
