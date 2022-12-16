import React, { useEffect } from "react";
import ServiceSlider from "../../servicesSlider/ServiceSlider";
import { useSelector, useDispatch } from "react-redux";
import { TextComp } from "../../content/TextComponents/TextComponent";
import MainImage from "../../content/ImageComponents/ImgComp";
import "./HomePageComp.css";
import HowItWorks3 from "../../content/HowItWorksComponent/HowItWorksComp";
import { CircularTextComp } from "../../content/CircularRingComponent/CircRingComp";
import thumbsupimg from "../../../../Image/customer_satisfaction.webp";
import carinhandimage from "../../../../Image/carinhand.webp";
import umbrella from "../../../../Image/umbrella.svg";
import water from "../../../../Image/Group 102@2x.webp";
import { loginOpen } from "../../../../Redux/LoginToggle/LoginActions";
import { carCareHeader, carCareParagraph, customerSatishFactionHeader, customerSatishfactionParagraph, reliabilityHeader, reliabilityParagraph, saveWaterHeading, saveWaterParaGraph, weSwearByHeading } from "./homePage.util";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
const Homepage = (props) => {
  const isLogPopup = useSelector((state) => state.loginToggle.Toggle);
  const dispacth = useDispatch();
  useEffect(() => {
    document.body.scrollTop = 0;
    props.click();
    isLogPopup ? dispacth(loginOpen()) : console.log("popup closed");
  }, []);
  const redstyles = {
    backgroundColor: "#F37A7D",
    color: "black",
    fontSize: width.matches ? "1.4vw" : '4.5vw',
    
  };
  const bluestyles = {
    backgroundColor: "#94D9EF",
    color: "black",
    fontSize: width.matches ? "1.4vw" : "4.5vw",
  };
  return (
    <div className="homPageContainer">
      <div className="swearbyHeader">
        <h1>{weSwearByHeading}</h1>
      </div>

      <div className="homepageMainContainer">
        <div className="swearByRow">
          <div className="swearByLeft">
            <MainImage type={carinhandimage} squareImage={true} />
          </div>
          <div className="swearByRight">
            <h1>{carCareHeader}</h1>
            <TextComp paragraph={carCareParagraph} />
          </div>
        </div>

        <div className="circTextRow">
          <CircularTextComp
            imgUrl={umbrella}
            heading={reliabilityHeader}
            paragraph={reliabilityParagraph}
            styles={redstyles}
          />
          <CircularTextComp
            imgUrl={water}
            heading={saveWaterHeading}
            styles={bluestyles}
            paragraph={saveWaterParaGraph}
          />
        </div>

        <div className="customerSatishfactionRow">
          <div className="customerSatishfactionLeft">
            <h1>{customerSatishFactionHeader}</h1>
            <TextComp
              
              paragraph={customerSatishfactionParagraph}
            />
          </div>
          <div className="customerSatishfactionRight">
            <MainImage type={thumbsupimg} />
          </div>
        </div>
      </div>
      <div className="serviceSliderHomePage">
        <h1>OUR SERVICES</h1>
        <ServiceSlider/>
</div>
      <div style={{ alignItems: "center" }}>
        <HowItWorks3 />
      </div>
    </div>
  );
};
export default Homepage;

