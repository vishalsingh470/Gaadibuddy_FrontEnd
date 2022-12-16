import Slider from "react-slick";
import React,{useRef} from "react";
import MainImage from "../content/ImageComponents/ImgComp";
import { ServicesArray } from "./ServiceSlider.util";
import "./ServiceSlider.css";

import { Link } from "react-router-dom";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
export default function ServiceSlider() {
  const slider = React.useRef(null);
  var settings = {  
    dots: width.matches ? false : true,
    infinite: false,
    speed: 500,
    slidesToShow: width.matches ? 3 : 1,
    slidesToScroll: 1,
    arrow: true,
  };

  return (
    <Slider   className="sliderContainer" {...settings}>
      

      {ServicesArray.map((oneService) => (
        <div className="oneServiceBox" key={oneService.id}>
          <h2>{oneService.serviceName}</h2>
          <MainImage type={oneService.serviceImage} />
          <button style={{marginTop:20}}>
            <Link
              to={{
                pathname: `services/${oneService.serviceName.toLowerCase()}`,
              }}
            >
              DISCOVER MORE
            </Link>
          </button>
        </div>
      ))}
     
    </Slider>
  );
}
