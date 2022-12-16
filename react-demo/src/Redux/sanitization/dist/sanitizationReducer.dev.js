"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var INITIAL_STATE = {
  Toggle: false,
  category: "Sanitization",
  price: ""
};

var SanitizationReducer = function SanitizationReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SANITIZATION_TOGGLE":
      return {
        Toggle: !state.Toggle,
        category: action.payload,
        price: 399
      };

    default:
      return state;
  }
};

var _default = SanitizationReducer;
exports["default"] = _default;