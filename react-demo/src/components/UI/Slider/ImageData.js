import i1b from "../../../Image/offersMobile.webp";
import i1 from "../../../Image/offersDesktop.webp";
// import i2 from '../../../Image/car shine.jpg'
import i2b from "../../../Image/detailingMobile.webp";
import i2 from "../../../Image/detailingDesktop.webp";
//import i3 from '../../../Image/interior.jpg'
import i3 from "../../../Image/washingDesktop.webp";
import i3b from "../../../Image/washingMobile.webp";
//import i4 from '../../../Image/water_waste.jpg'
import i4b from "../../../Image/sanitizationMobile.webp";
import i4 from "../../../Image/sanitizationDesktop.webp";
import i5b from "../../../Image/sliderJumpstartMobile.png";
import i5 from "../../../Image/sliderJumpStart.png";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
const sliderArr = [
  {
    id: 3,
    imgSrc: width.matches ? i3 : i3b,
    description: "WASHING",
    details: "Showroom wash at your doorstep",
    color: "#FF070A",
    subColor: "#FF070A",
    mobileTopAdjustment: "1vh",
    mobileTopAdjustmentSub: "-28vh",
    mobileWidth: "60vw",
    mobileLeftAdjustment: "46vw",
    mobileLeftAdjustmentSub: "30vw",
    desktopLeftAdjustmentSub: "50vw",
    servicePageLink: "washing",
  },
  {
    id: 1,
    imgSrc: width.matches ? i4 : i4b,
    description: "SANITIZATION",
    details: "Sanitization is key for breaking Covid spread chain",
    color: "#1D590C",
    subColor: "#1D590C",
    leftAdjustment: "-5%",
    mobileTopAdjustment: "1vh",
    mobileTopAdjustmentSub: "-14vh",
    mobileWidth: "80vw",
    mobileLeftAdjustment: "40vw",
    mobileLeftAdjustmentSub: "20vw",
    servicePageLink: "sanitization",
  },
  {
    id: 2,
    imgSrc: width.matches ? i2 : i2b,
    description: "DETAILING",
    details: "Make your Car shine as new with our detailing service",
    color: "#FFF803",
    subColor: "#FFF803",
    mobileTopAdjustment: "2vh",
    mobileDownAdjustment: "10rem",
    mobileTopAdjustmentSub: "-10vh",
    mobileWidth: "80vw",
    mobileLeftAdjustment: "55vw",
    mobileLeftAdjustmentSub: "19vw",
    servicePageLink: "detailing",
  },
  {
    id: 5,
    imgSrc: width.matches ? i5 : i5b,
    description: "JUMPSTART",
    details: "Battery dead!!! Call us anywhere.",
    color: "#FD5922",
    subColor: "#FD5922",
    mobileTopAdjustment: "2vh",
    mobileTopAdjustmentSub: "-12vh",
    mobileWidth: "60vw",
    mobileLeftAdjustment: "45vw",
    mobileLeftAdjustmentSub: "38vw",
    deskTopKiCkStartWidth: "",
    servicePageLink: "jumpstart",
    desktopLeftAdjustmentSub: "50vw",
  },
];

export default sliderArr;
