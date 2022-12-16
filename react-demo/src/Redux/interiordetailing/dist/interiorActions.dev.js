"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteriorToggle = void 0;

var InteriorToggle = function InteriorToggle(category) {
  return {
    type: "INTERIOR_TOGGLE",
    payload: category
  };
};

exports.InteriorToggle = InteriorToggle;