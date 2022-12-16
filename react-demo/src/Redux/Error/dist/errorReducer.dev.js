"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var INITIAL_STATE = {
  errorMessage: null
};

var setErrorMessage = function setErrorMessage(message) {
  if (_typeof(message) === "object") return "No Internet Connection.";else if (message.includes("Invalid credentials")) return "INVALID CREDENTIALS";else if (message.includes("User already exists..Login instead.")) return "Customer exists already, please login instead";else if (message.includes("ValidationError: email")) return "Email already exists.";else if (message.includes("ValidationError: mobileNo")) return "Mobile already exists.";else if (message.includes("User does not exist")) return "NOT REGISTERED";
};

var errorReducer = function errorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_ERROR":
      return {
        errorMessage: setErrorMessage(action.payload)
      };

    case "RESET_ERROR":
      return {
        errorMessage: null
      };

    default:
      return state;
  }
};

var _default = errorReducer;
exports["default"] = _default;