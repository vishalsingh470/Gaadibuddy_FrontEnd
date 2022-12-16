
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { ServiceCard } from "../../../../globaStyles/styleElements";
import detailing from "../../../../Image/detailing.webp";
import detailingTop from "../../../../Image/detailingTop.webp";
import exterior_detailing from "../../../../Image/Exterior_big.webp";
import interior_detailing from "../../../../Image/Interior_big.webp";
import JumpStart from "../../../../Image/jumpstart.jpg";
import Waxing from "../../../../Image/waxing.jpg"
import sanitization from "../../../../Image/sanitization.webp";
import ServiceSanitizationImg from "../../../../Image/servicesanitization.webp";
import CarWashingImg from "../../../../Image/servicewashing.webp";
import Washing from "../../../../Image/washingMobile.webp";
import {
  addCar,
  addCarPage,
  isLogged,
} from "../../../../Redux/UserRedux/UserActions";
import { baseUrl } from "../../../../variables/variables";
import BookingForm from "../../../UI/content/BookingFormComponent/BookingComp";
import BoxComponent from "../../../UI/content/BoxComponent/BoxComp";
import MainImage from "../../../UI/content/ImageComponents/ImgComp";
import { ServiceTextComp } from "../../content/TextComponents/TextComponent";
import {
  batteryJumpStartParagraph,
  detailingHeader,
  detailingMainParagraph,
  exteriorDetailingParagraph,
  exteriorHeader,
  exteriorPoints,
  goldPoints,
  interiorDetaingParagraph,
  interiorHeader,
  interiorPoints,
  jumpStartHeader,
  jumpStartPoints,
  oneTimePoints,
  platinumPoints,
  sanitHeader,
  sanitizationParagraph,
  silverPoints,
  washingHeader,
  washingParagraph,
  washingpoints,
  waxingHeader,
  waxingParagraph,
  waxingPoints
} from "./servicePage.util";
import "./ServicePageComp.css";

const width = { matches: window.matchMedia("(min-width: 768px)").matches };
const Servicepage = (props) => {
  //*useSelectors
  const isLogPopup = useSelector((state) => state.loginToggle.Toggle);
  const isLoggedIn = useSelector((state) => state.user.UserSignedIn);
  const user = useSelector((state) => state.user.customer);
  const addCarReached = useSelector((state) => state.user.addcarPage);

  //*Dispatches
  const dispacth = useDispatch();

  //*MANAGES ALL TOGGLES
  const [toggleState, setToggle] = useState({
    onetimeToggle: false,
    silverToggle: false,
    goldToggle: false,
    platinumToggle: false,
    sanitizationToggle: false,
    detailingToggle: false,
    batteryJumpStart: false,
    waxingToggle:false
  });
  //* REFs AND SCROLLING ADJUSTMENTS
  const adjusSanitOffest = isLoggedIn
    ? width.matches
      ? 700
      : 1200
    : width.matches
    ? 700
    : 600;
  const adjustWashingOffset = isLoggedIn
    ? width.matches
      ? 700
      : 1000
    : width.matches
    ? 700
    : 600; //*LOGOUT
  // const adjustWashingOffset = width.matches ? 350 : 700; //*LOGIN
  const scrollSection = useRef(null);
  const prevSection = useRef(null);
  const prevSectionSanit = useRef(null);
  const prevSectionDetailing = useRef(null);
  const scrollSanitizationSection = useRef(null);
  const scrollDetailingScetion = useRef(null);
  const scrollBatterySection = useRef(null);
  const scrollWaxingSection = useRef(null);

  //*DIFFRENT FUNCTIONS FOR DIFFRENT SCROLLS

  const ScrollToSection = () => {
    document.body.scrollTo({
      top: scrollSection.current.offsetTop - adjustWashingOffset,
      behavior: "smooth",
    });
  };

  const ScrollToSanitSection = () => {
    document.body.scrollTo({
      top: scrollSanitizationSection.current.offsetTop - adjusSanitOffest,
      behavior: "smooth",
    });
  };
  const ScrollToDetailingSection = () => {
    document.body.scrollTo({
      top: scrollDetailingScetion.current.offsetTop - adjusSanitOffest,
      behavior: "smooth",
    });
  };
  const ScrollToBatterySection = () => {
    document.body.scrollTo({
      top: scrollBatterySection.current.offsetTop - adjusSanitOffest,
      behavior: "smooth",
    });
  };
  const ScrollToWaxingSection = () => {
    document.body.scrollTo({
      top: scrollWaxingSection.current.offsetTop - adjusSanitOffest,
      behavior: "smooth",
    });
  };

  const ScrollToPrevSection = () => {
    console.log(prevSection.current.offsetTop);
    document.body.scrollTo({
      bottom: prevSection.current.offsetTop,
      behavior: "smooth",
    });
  };
  const ScrollToDetPrevSection = () => {
    document.body.scrollTo({
      bottom: prevSectionDetailing.current.offsetTop,
      behavior: "smooth",
    });
  };
  const ScrollTosanitPrevSection = () => {
    document.body.scrollTo({
      bottom: prevSectionSanit.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [mobileToggle, setMobileToggle] = useState({
    toggle: "ONE TIME",
  });
  const handleToggle = (toggle) => {
    console.log(toggle);

    switch (toggle) {
      case "ONE TIME": {
        setToggle({ onetimeToggle: !toggleState.onetimeToggle });

        break;
      }
      case "SILVER": {
        setToggle({ silverToggle: !toggleState.silverToggle });

        break;
      }
      case "GOLD": {
        setToggle({ goldToggle: !toggleState.goldToggle });

        break;
      }
      case "PLATINUM": {
        setToggle({ platinumToggle: !toggleState.platinumToggle });

        break;
      }
      case "SANITIZATION": {
        setToggle({ sanitizationToggle: !toggleState.sanitizationToggle });

        break;
      }
      case "DETAILING": {
        setToggle({ detailingToggle: !toggleState.detailingToggle });

        break;
      }
      case "JUMPSTART": {
        setToggle({ batteryJumpStart: !toggleState.batteryJumpStart });

        break;
      }
      case "WAXING": {
        setToggle({ waxingToggle: !toggleState.waxingToggle });

        break;
      }

      default:
        return toggleState;
    }
  };

  //*DECIDES WHICH SCROLL TO EXECUTE
  const ScrollingDecider = () => {
    if (
      toggleState.onetimeToggle ||
      toggleState.silverToggle ||
      toggleState.goldToggle ||
      toggleState.platinumToggle
    ) {
      if (toggleState.onetimeToggle) {
        ScrollToSection();
      } else if (toggleState.silverToggle) {
        ScrollToSection();
      } else if (toggleState.goldToggle) {
        ScrollToSection();
      } else if (toggleState.platinumToggle) {
        ScrollToSection();
      } else {
        ScrollToPrevSection();
      }
    } else if (toggleState.detailingToggle) {
      if (toggleState.detailingToggle) {
        ScrollToDetailingSection();
      } else {
        ScrollToDetPrevSection();
      }
    } else if (toggleState.batteryJumpStart) {
      if (toggleState.batteryJumpStart) {
        ScrollToBatterySection();
      } else {
      }
    } else if (toggleState.waxingToggle) {
      if (toggleState.waxingToggle) {
        ScrollToWaxingSection();
      } else {
      }
    } else if (toggleState.sanitizationToggle) {
      if (toggleState.sanitizationToggle) {
        ScrollToSanitSection();
      } else {
        ScrollTosanitPrevSection();
      }
    }
  };

  //*1st USEEFFECT - RETRIVES LOCAL STORAGE AND SETS THE PERV STATE-->CURRENT STATE
  const addOnlyNewVehicle = (newVehicles) => {
    // console.log(newVehicles)

    // if (newVehicles.length === user.cars.length)
    // {
    //   console.log("no new Cars Added")
    // }
    // else {
    // dispatch(replaceCars(newVehicles));
    // }
    function comparer(otherArray) {
      return function (current) {
        return (
          otherArray.filter(function (other) {
            return other.id === current.id;
          }).length === 0
        );
      };
    }

    var onlyInA = newVehicles.filter(comparer(user.cars));
    var onlyInB = user.cars.filter(comparer(newVehicles));

    const result = onlyInA.concat(onlyInB);

    result.map((oneCar) => dispacth(addCar(oneCar)));
  };
  const upDateUserVehicles = () => {
    fetch(`${baseUrl}cars/customer/${user.id}`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.car !== undefined) {
          addOnlyNewVehicle(resp.car);
        }
      })
      .catch((err) => console.log(err, "error while updating cars"));
  };
  useEffect(
    () => {
      upDateUserVehicles();
      const PreviousToggleState = localStorage.getItem("toggleState");

      if (PreviousToggleState && isLogged) {
        console.log("PREVIUOS TOGGLE IS ENABLED");
        setToggle(JSON.parse(PreviousToggleState));
      }

      //  const PreviousPositon = localStorage.getItem("previousPosition");
      //* TO CLOSE THE BACKDROP
      props.click();

      console.log("ADD CAR REACHED ISSSSSSS", addCarReached);

      if (!addCarReached || !isLoggedIn) {
        setToggle({
          detailingToggle: false,
          goldToggle: false,
          silverToggle: false,
          onetimeToggle: false,
          platinumToggle: false,
          sanitizationToggle: false,
        });
      } else {
        dispacth(addCarPage(false));
      }

      //* CHECKS PREVIOUS TOGGLES AND FROM ADD CAR PAGE AND LOGGED IN THEN SCROLLS TO POSITION

      switch (addCarReached) {
        case true: {
          if (
            JSON.parse(PreviousToggleState)?.onetimeToggle === true ||
            JSON.parse(PreviousToggleState)?.silverToggle === true ||
            JSON.parse(PreviousToggleState)?.goldToggle === true ||
            JSON.parse(PreviousToggleState)?.platinumToggle === true
          ) {
            document.body.scrollTo({
              top: scrollSection.current.offsetTop,
              behavior: "smooth",
            });
          } else if (
            JSON.parse(PreviousToggleState)?.sanitizationToggle === true
          ) {
            document.body.scrollTo({
              top: scrollSanitizationSection.current.offsetTop,
              behavior: "smooth",
            });
          } else if (JSON.parse(PreviousToggleState)?.detailingToggle === true) {
            document.body.scrollTo({
              top: scrollDetailingScetion.current.offsetTop,
              behavior: "smooth",
            });
          } else {
            console.log("inside else");
            document.body.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
          break;
        }
        case false: {
          document.body.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          break;
        }
        default: {
          document.body.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    },

    //*MOBILE HANDLER FOR CLOSING THE BACKDROP

    //! to be removed isLogPopup ? dispacth(loginOpen()) : console.log("popup closed");
    []
  );

  //*SETS THE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("toggleState", JSON.stringify(toggleState));
    localStorage.setItem("previousPosition", scrollSection.current.offsetTop);
  });

  useEffect(() => {
    ScrollingDecider();
  }, [handleToggle]);

  return (
    <div className="ServicepageContainer">
      {width.matches ? null : (
        <div className="serviceSmallCardsMobile">
          <ServiceCard
            fontColor="black"
            backGroundColor=" linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
          >
            <a href="#washing">{washingHeader}</a>
          </ServiceCard>
          <ServiceCard
            fontColor="black"
            backGroundColor=" linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);"
          >
            <a href="#sanitization">{sanitHeader}</a>
          </ServiceCard>
          <ServiceCard
            fontColor="black"
            backGroundColor="linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);"
          >
            <a href="#detailing">{detailingHeader}</a>
          </ServiceCard>
          <ServiceCard
            fontColor="black"
            backGroundColor="
 linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
          
         "
          >
            <a href="#jumpStart">{jumpStartHeader}</a>
          </ServiceCard>
        </div>
      )}

      <div className="washingRow">
        <div className="washingRowLeft">
          <h1>{washingHeader}</h1>
          <ServiceTextComp
            paragraph={washingParagraph}
            points={washingpoints}
          />
        </div>
        <div className="washingRowRight">
          <MainImage type={CarWashingImg} />
        </div>
      </div>

      {width.matches ? (
        <div>
          <div ref={prevSection}></div>
          <div className="serviceBoxesDesktop">
            <BoxComponent
              category={"ONE TIME"}
              text={oneTimePoints}
              togglePress={handleToggle}
            />

            <BoxComponent
              category={"SILVER"}
              text={silverPoints}
              togglePress={handleToggle}
            />

            <BoxComponent
              category={"GOLD"}
              text={goldPoints}
              togglePress={handleToggle}
            />

            <BoxComponent
              category={"PLATINUM"}
              text={platinumPoints}
              togglePress={handleToggle}
            />
          </div>
          <div className="boookingFormContainerDesktop">
            {toggleState.platinumToggle ? (
              <BookingForm
                click={props.click}
                category="PLATINUM"
                cars={user.cars}
                togglePress={handleToggle}
              />
            ) : null}
            {toggleState.onetimeToggle ? (
              <BookingForm
                click={props.click}
                category="ONE TIME"
                cars={user.cars}
                togglePress={handleToggle}
              />
            ) : null}
            {toggleState.goldToggle ? (
              <BookingForm
                click={props.click}
                category="GOLD"
                cars={user.cars}
                togglePress={handleToggle}
              />
            ) : null}
            {toggleState.silverToggle ? (
              <BookingForm
                click={props.click}
                category="SILVER"
                cars={user.cars}
                togglePress={handleToggle}
              />
            ) : null}
            <div ref={scrollSection}></div>
          </div>
        </div>
      ) : (
        <div className="serviceboxesMobile">
          <div className="mobileToggleButtons" ref={prevSection}>
            <button onClick={() => setMobileToggle({ toggle: "ONE TIME" })}>
              ONETIME
            </button>
            <button onClick={() => setMobileToggle({ toggle: "SILVER" })}>
              SILVER
            </button>
            <button onClick={() => setMobileToggle({ toggle: "GOLD" })}>
              GOLD
            </button>
            <button onClick={() => setMobileToggle({ toggle: "PLATINUM" })}>
              PLATINUM
            </button>
          </div>
          <div className="boookingFormContainerMobile">
            {" "}
            {mobileToggle.toggle === "ONE TIME" ? (
              <div>
                <BoxComponent
                  category={"ONE TIME"}
                  text={oneTimePoints}
                  togglePress={handleToggle}
                />
                {toggleState.onetimeToggle ? (
                  <BookingForm
                    click={props.click}
                    category="ONE TIME"
                    cars={user.cars}
                    togglePress={handleToggle}
                  />
                ) : null}
              </div>
            ) : null}
            {mobileToggle.toggle === "SILVER" ? (
              <div>
                <BoxComponent
                  category={"SILVER"}
                  text={silverPoints}
                  togglePress={handleToggle}
                />
                {toggleState.silverToggle ? (
                  <BookingForm
                    click={props.click}
                    category="SILVER"
                    cars={user.cars}
                    togglePress={handleToggle}
                  />
                ) : null}
              </div>
            ) : null}
            {mobileToggle.toggle === "GOLD" ? (
              <div>
                <BoxComponent
                  category={"GOLD"}
                  text={goldPoints}
                  togglePress={handleToggle}
                />
                {toggleState.goldToggle ? (
                  <BookingForm
                    click={props.click}
                    category="GOLD"
                    cars={user.cars}
                    togglePress={handleToggle}
                  />
                ) : null}
              </div>
            ) : null}
            {mobileToggle.toggle === "PLATINUM" ? (
              <div>
                <BoxComponent
                  category={"PLATINUM"}
                  text={platinumPoints}
                  togglePress={handleToggle}
                />
                {toggleState.platinumToggle ? (
                  <BookingForm
                    click={props.click}
                    category="PLATINUM"
                    cars={user.cars}
                    togglePress={handleToggle}
                  />
                ) : null}
              </div>
            ) : null}{" "}
            <div ref={scrollSection}></div>
          </div>
        </div>
      )}

      <div className="sanitizationRow" id="sanitization">
        <div className="sanitizationLeft" ref={prevSectionSanit}>
          <MainImage type={ServiceSanitizationImg} />
        </div>
        <div className="sanitizationRight">
          <h1> {sanitHeader}</h1>
          <ServiceTextComp paragraph={sanitizationParagraph} />

          <div className="sanitizationButtonContainer">
            <button
              onClick={() => {
                handleToggle("SANITIZATION");
              }}
            >
              BOOK
            </button>
          </div>
        </div>
      </div>
      <div className="boookingFormContainerDesktop">
        {toggleState.sanitizationToggle ? (
          <BookingForm
            click={props.click}
            category="SANITIZATION"
            cars={user.cars}
            togglePress={handleToggle}
          />
        ) : null}
        <div ref={scrollSanitizationSection}></div>
      </div>

      <div className="detailingRow" id="detailing">
        <div className="detailingLeft" ref={prevSectionDetailing}>
          <h1>{detailingHeader}</h1>
          <ServiceTextComp paragraph={detailingMainParagraph} />
        </div>
        <div className="detailingRight">
          <MainImage type={detailingTop} />
        </div>
      </div>

      <div className=" interiorRow">
        <div className="interiorLeft">
          <MainImage type={interior_detailing} />
        </div>

        <div className="interiorRight">
          <h1>{interiorHeader}</h1>
          <ServiceTextComp
            paragraph={interiorDetaingParagraph}
            points={interiorPoints}
          />
        </div>
      </div>

      <div className="exteriorRow">
        <div className="exteriorLeft">
          <h1>{exteriorHeader}</h1>
          <ServiceTextComp
            paragraph={exteriorDetailingParagraph}
            points={exteriorPoints}
          />
        </div>
        <div className="exteriorRight" ref={prevSectionDetailing}>
          <MainImage type={exterior_detailing} />
        </div>
      </div>

      <div className="detailingButtonContainer">
        <button
          onClick={() => {
            handleToggle("DETAILING");
          }}
        >
          BOOK
        </button>
      </div>
      <div className="boookingFormContainerDesktop">
        {toggleState.detailingToggle ? (
          <BookingForm
            click={props.click}
            category="DETAILING"
            cars={user.cars}
            togglePress={handleToggle}
          />
        ) : null}
      </div>
      <div classname="bottomOfDetailing" ref={scrollDetailingScetion}></div>
      <div className="waxingRow">
        <div className="waxingLeft">
          <MainImage type={Waxing} />
        </div>

        <div className="waxingRight">
          <h1>{waxingHeader}</h1>
          <ServiceTextComp paragraph={waxingParagraph} points={waxingPoints} />
          <div className="waxingButtonContainer">
            <button
              onClick={() => {
                handleToggle("WAXING");
              }}
            >
              BOOK
            </button>
          </div>
        </div>
      </div>
      <div className="boookingFormContainerDesktop">
        {toggleState.waxingToggle ? (
          <BookingForm
            click={props.click}
            category="WAXING"
            cars={user.cars}
            togglePress={handleToggle}
          />
        ) : null}
      </div>
      <div ref={scrollWaxingSection}></div>
      <div className="jumpStartRow" id="jumpStart">
        <div className="jumpStartLeft">
          <h1 style={width.matches ? { marginLeft: "-30%" } : {}}>
            {jumpStartHeader}
          </h1>
          <ServiceTextComp
            paragraph={batteryJumpStartParagraph}
            points={jumpStartPoints}
          />
          <div className="jumpStartButtonContainer">
            <button
              onClick={() => {
                handleToggle("JUMPSTART");
              }}
            >
              BOOK
            </button>
          </div>
        </div>
        <div className="jumpStartRight" ref={prevSectionDetailing}>
          <MainImage type={JumpStart} />
        </div>
      </div>
      <div className="boookingFormContainerDesktop">
        {toggleState.batteryJumpStart ? (
          <BookingForm
            click={props.click}
            category="JUMPSTART"
            cars={user.cars}
            togglePress={handleToggle}
          />
        ) : null}
      </div>
      <div ref={scrollBatterySection}></div>
    </div>
  );
};
export default Servicepage;
