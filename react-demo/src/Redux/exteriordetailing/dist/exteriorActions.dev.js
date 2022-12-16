"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exteriorToggle = void 0;

var exteriorToggle = function exteriorToggle(category) {
  return {
    type: "EXTERIOR_TOGGLE",
    payload: category
  };
};

exports.exteriorToggle = exteriorToggle;