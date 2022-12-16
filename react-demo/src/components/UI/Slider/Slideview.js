import React, { useEffect } from "react";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImgComponent from "./ImgComponent";
import ImageData from "./ImageData";

const   Slideview =(props)=>   {
    useEffect(() => {
      document.body.scrollTop = 0;
      props.click();
    }, []);
    var settings = {
      dots: true,
    infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      
    };

    const imgData = ImageData.map((item) => {
      return <ImgComponent key={item.id} imgComponent={item}  />;
    });
    return (
      <div >
        <Slider {...settings} styles={{Width:"100vw"}}>{imgData}</Slider>
      </div>
    );
 
}
export default Slideview;
