"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cartConditions = require("./cartConditions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  CartToggle: false,
  CartItems: []
};

var CartReducer = function CartReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // case "CART_TOGGLE":
    //   return {
    //     CartToggle: !state.CartToggle,
    //   };
    case "ADD_TO_CART":
      return _objectSpread({}, state, {
        CartItems: (0, _cartConditions.addItemsToCart)(state.CartItems, action.payload)
      });

    case "REMOVE_FROM_CART":
      return _objectSpread({}, state, {
        CartItems: (0, _cartConditions.removeFromCart)(state.CartItems, action.payload)
      });

    case "UPDATE_FROM_CART":
      return _objectSpread({}, state, {
        CartItems: (0, _cartConditions.updateFromCart)(state.CartItems, action.payload)
      });

    case "EMPTY_CART":
      return _objectSpread({}, state, {
        CartItems: []
      });

    case "LOGGED_OUT":
      return _objectSpread({}, state, {
        CartItems: []
      });

    case "REFRESH_CART":
      return _objectSpread({}, state, {
        CartItems: action.payload
      });

    default:
      return state;
  }
};

var _default = CartReducer;
exports["default"] = _default;