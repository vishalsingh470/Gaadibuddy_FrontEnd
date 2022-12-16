import React, { useState,useEffect, useRef } from "react";
import "./ServicePageComponent.css";

import BookingForm from "../../../../components/UI/content/BookingFormComponent/BookingComp";
import { useSelector } from "react-redux";
import { tr } from "date-fns/locale";
export default function ServicePageComponent(props) {
  const {
    serviceDescription,
    interiorPoints,
    exteriorPoints,
    servicePoints,
    oneTimePoints,
    silverPoints,
    goldPoints,
    platinumPoints,
    serviceImage,
    serviceOptions,
    fullPoints,
     interiorimage,
    exteriorImage
  } = props.serviceDetails;
 
  
  const width = { matches: window.matchMedia("(min-width: 768px)").matches };
 
  const executeScroll = () => {
   
  document.body.scrollTo({
        top: width.matches ? scrollYoffsetDesktop : scrollYoffsetMobile,
        behavior: "smooth",
     })
  }
  const removeScroll = () => {
  
    document.body.scrollTo({
      top: width.matches ? 0 : 0,
      behavior: "smooth",
    });
  }
  
 const [scrollTrigger, setScrollTrigger] = useState(false);
const [toggl, setToggle] = useState(false);
   const [defalutOption, setDefaultOption] = useState(
     serviceOptions.length === 0 ? props.serviceName : serviceOptions[0]
  );
  const [refresh,setRefrest] = useState(false)
useEffect(() => {
   setDefaultOption(
     serviceOptions?.length === 0 ? props.serviceName : serviceOptions[0]
  );
  
  setToggle(false)
  setScrollTrigger(false)
}, [props?.serviceDetails]);
   let scrollYoffsetMobile = 800;
   let scrollYoffsetDesktop = 700;

  useEffect(() => {
    
    if (toggl === true) {
      executeScroll();
      
    }
    else if(scrollTrigger === true && toggl === true)
    { 
       
       executeScroll()
      }
      else if (scrollTrigger === false && toggl === false) {
        removeScroll();
        
      }
      else {
        removeScroll()
        
    }
  }, [defalutOption,scrollTrigger,toggl]);
  
 

  


  const user = useSelector((state) => state.user.customer);

  return (
    <div className="serviceComponentContaoner">
      <div className="service-top">
        <h1>{props?.serviceName.toUpperCase()}</h1>
        <p>{serviceDescription}</p>
      </div>
      <div className={ serviceOptions?.length ===4 ? "service-middle" : "service-middle three"}>
        {serviceOptions?.map((oneOption) => (
          <button
            style={{
              backgroundColor:
                oneOption === defalutOption ? "#024126" : "white",
              color: oneOption === defalutOption ? "white" : "black",
              border: " 2px solid #024126",
              borderRadius:'10px'
            }}
            onClick={() => {
              setScrollTrigger(true)
              setDefaultOption(oneOption)
            }}
          >
            {oneOption.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="service-bottom">
        <div className="bottom-left">
          {/* todo conditionally render onetime/silver/interior or whatever based on default option */}
          <img
            src={
              defalutOption === "INTERIOR"
                ? interiorimage
                : null || defalutOption === "EXTERIOR"
                ? exteriorImage
                : null ||
                  defalutOption !== "INTERIOR" ||
                  defalutOption !== "EXTERIOR"
                ? serviceImage
                : null
            }
            alt={serviceImage}
          ></img>
        </div>
        <div className="bottom-right">
          <div
            className={
              props?.serviceName.toUpperCase() === "WASHING"
                ? "pointsContainerWashing"
                : null || props.serviceName.toUpperCase() === "DETAILING"
                ? "pointsContainerDetailing"
                : null || props.serviceName.toUpperCase() === "SANITIZATION"
                ? "pointsContainerSanitization"
                : null || props.serviceName.toUpperCase() === "JUMPSTART"
                ? "pointsContainerJumpStart"
                : null || props.serviceName.toUpperCase() === "WAXING"
                ? "pointsContainerWaxing"
                : null
            }
          >
            {defalutOption === "ONE TIME"
              ? oneTimePoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "SILVER"
              ? silverPoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "GOLD"
              ? goldPoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "PLATINUM"
              ? platinumPoints?.map((onePoint) => (
                  <div className="bottom-right-points platinumPoint">
                    <li style={{ marginTop: "0%" }}></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "INTERIOR"
              ? interiorPoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li style={{ marginTop: "0%" }}></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "EXTERIOR"
              ? exteriorPoints?.map((onePoint) => (
                  <div className="bottom-right-points ">
                    <li style={{ marginTop: "0%" }}></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === "FULL"
              ? fullPoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li style={{ marginTop: "0%" }}></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null || defalutOption === props.serviceName
              ? servicePoints?.map((onePoint) => (
                  <div className="bottom-right-points">
                    <li style={{ marginTop: "0%" }}></li>
                    <p>{onePoint}</p>
                  </div>
                ))
              : null}
          </div>

          <div
            className={
              defalutOption?.toUpperCase() === "PLATINUM"
                ? "servicePageBookingButtonContainerPlatinum"
                : "servicePageBookingButtonContainer" ||
                  props.serviceName?.toUpperCase() === "SANITIZATION"
                ? "servicePageBookingButtonContainerSanitization"
                : "servicePageBookingButtonContainer"
            }
          >
            <button
              
              onClick={() => {
                setToggle(!toggl);
                
                setScrollTrigger(true)
              }}
            >
              BOOK
            </button>
          </div>
        </div>
      </div>

      {toggl ? (
        <div className="servicePageBookingFormContainer">
          <BookingForm
            category={
              props.serviceName.toUpperCase() === "WASHING"
                ? defalutOption.toUpperCase()
                : props.serviceName.toUpperCase()
            }
            cars={user.cars}
            togglePress={() => setToggle(false)}
            surface={defalutOption.toUpperCase()}
          />
        </div>
      ) : null}
      {/* <div ref={bottomOfBooking}></div> */}
    </div>
  );
}
