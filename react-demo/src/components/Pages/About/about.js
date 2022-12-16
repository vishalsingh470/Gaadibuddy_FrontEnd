//?  HARD CODED VALUES removed from page

import React, { useEffect } from "react";
import { TextComp } from "../../UI/content/TextComponents/TextComponent";
import MainImage from "../../UI/content/ImageComponents/ImgComp";
import MissionImage from "../../../Image/mission image@2x.webp";
import OurStoryImg from "../../../Image/our story image@2x.webp";
import { useSelector, useDispatch } from "react-redux";
import { loginOpen } from "../../../Redux/LoginToggle/LoginActions";
import { CircularTextCompGradient } from "../../../components/UI/content/CircularRingComponent/CircRingComp";
import {
  blueStyle,
  commitmentContent,
  commitmentHeader,
  improvementContent,
  improvementHeader,
  mainHeading,
  ourMissionContent,
  ourMissionHeader,
  ourStoryContent,
  ourStoryHeader,
  ourValuesHeader,
  pinkStyle,
  transpaarencyHeader,
  transparencyContent,
  yellowStyle,
} from "./about.utils";
import "./about.css";
const About = (props) => {
  const isLogPopup = useSelector((state) => state.loginToggle.Toggle);
  const dispacth = useDispatch();
  useEffect(() => {
    document.body.scrollTop = 0;
    props.click();
    isLogPopup ? dispacth(loginOpen()) : console.log("popup closed");
  }, []);

  return (
    <div className="aboutcontainer">
      <div className="aboutHeader">
        <h1>{mainHeading}</h1>
      </div>
      <div className="ourMissionHeader">
        <h1>{ourMissionHeader}</h1>
      </div>

      <div className="ourMissionRow">
        <div className="ourMissionLeft">
          <TextComp paragraph={ourMissionContent} />
        </div>
        <div className="ourmissionRight">
          <MainImage type={MissionImage} />
        </div>
      </div>
      <div className="ourstoryHeader">
        {" "}
        <h1>{ourStoryHeader}</h1>
      </div>

      <div className="ourstoryRow">
        <div className="ourStoryLeft">
          <p>{ourStoryContent}</p>
        </div>
        <div className="ourstoryRight">
          <MainImage type={OurStoryImg} />
        </div>
      </div>

      <div className="ourValuesHeader">
        <h1>{ourValuesHeader}</h1>
      </div>

      <div className="ourValuesContainer" style={{ marginBottom: "4rem" }}>
        <CircularTextCompGradient
          styles={pinkStyle}
          heading={transpaarencyHeader}
          paragraph={transparencyContent}
        />
        <CircularTextCompGradient
          styles={blueStyle}
          heading={commitmentHeader}
          paragraph={commitmentContent}
        />
        <CircularTextCompGradient
          styles={yellowStyle}
          heading={improvementHeader}
          paragraph={improvementContent}
        />
      </div>
    </div>
  );
};

export default About;
