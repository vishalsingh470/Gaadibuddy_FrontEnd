import React, { useEffect } from "react";
 
import Slideview from "../../UI/Slider/Slideview";
import Homepage from "../../UI/PageComponents/homePage/HomePageComp";

const Home = (props) => {
  useEffect(() => {
    document.body.scrollTop = 0;
    props.click();
    console.log(props)
  }, []);
  return (
    <div className="w4">
      <Slideview click={props.click} />
      <Homepage click={props.click} />
    </div>
  );
};

export default Home;
