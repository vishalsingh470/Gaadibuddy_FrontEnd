"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SanitToggle = void 0;

var SanitToggle = function SanitToggle(category) {
  return {
    type: "SANITIZATION_TOGGLE",
    payload: category
  };
};

exports.SanitToggle = SanitToggle;