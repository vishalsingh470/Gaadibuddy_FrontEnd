"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var INITIAL_STATE = {
  Toggle: false,
  category: "Interior Detailing",
  price: ""
};

var InteriorReducer = function InteriorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "INTERIOR_TOGGLE":
      return {
        Toggle: !state.Toggle,
        category: action.payload,
        price: 399
      };

    default:
      return state;
  }
};

var _default = InteriorReducer;
exports["default"] = _default;