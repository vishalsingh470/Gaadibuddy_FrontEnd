"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetMyError = exports.setMyError = void 0;

var setMyError = function setMyError(message) {
  return {
    type: "SET_ERROR",
    payload: message
  };
};

exports.setMyError = setMyError;

var resetMyError = function resetMyError() {
  return {
    type: "RESET_ERROR"
  };
};

exports.resetMyError = resetMyError;