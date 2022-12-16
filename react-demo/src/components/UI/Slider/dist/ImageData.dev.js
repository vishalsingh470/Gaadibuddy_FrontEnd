"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _Group932x = _interopRequireDefault(
  require("../../../Image/Group 93@2x.webp")
);

var _Group892x = _interopRequireDefault(
  require("../../../Image/Group 89@2x.webp")
);

var _Group902x = _interopRequireDefault(
  require("../../../Image/Group 90@2x.webp")
);

var _Group922x = _interopRequireDefault(
  require("../../../Image/Group 92@2x.webp")
);

var _Group912x = _interopRequireDefault(
  require("../../../Image/Group 91@2x.webp")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import i2 from '../../../Image/car shine.jpg'
//import i3 from '../../../Image/interior.jpg'
//import i4 from '../../../Image/water_waste.jpg'
var width = {
  matches: window.matchMedia("(min-width: 768px)").matches,
};
var sliderArr = [
  {
    id: 1,
    imgSrc: width.matches ? _Group892x["default"] : _Group932x["default"],
    description: "Step towards protecting valuable resource",
    details: "Check our Car Sanitization Packages available at your service.",
  },
  {
    id: 2,
    imgSrc: width.matches ? _Group912x["default"] : _Group912x["default"],
    description: "Step towards protecting valuable resource",
    details: "Why waste tons of water when it can be done with 200ml.",
  },
  {
    id: 3,
    imgSrc: width.matches ? _Group902x["default"] : _Group902x["default"],
    description: "Make your car shine as new.",
    details: "Check our detailing packages to shine your car.",
  },
  {
    id: 4,
    imgSrc: width.matches ? _Group922x["default"] : _Group922x["default"],
    description: "Beauty lies within.",
    details: "Check our interior detail packages at your service.",
  },
];
var _default = sliderArr;
exports["default"] = _default;
