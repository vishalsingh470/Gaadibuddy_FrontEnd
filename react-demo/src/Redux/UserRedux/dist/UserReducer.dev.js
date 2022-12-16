"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userConditions = require("./userConditions.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  UserSignedIn: false,
  CartToggle: false,
  customer: [],
  cars: [],
  orders: [],
  schedules: [],
  temp: ""
};

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "LOGGED_IN":
      return _objectSpread({}, state, {
        UserSignedIn: true,
        customer: action.payload
      });

    case "LOGGED_OUT":
      return _objectSpread({}, state, {
        UserSignedIn: false,
        customer: [],
        cars: [],
        orders: [],
        schedules: [],
        temp: ""
      });

    case "EDIT_USER":
      return _objectSpread({}, state, {
        customer: (0, _userConditions.replaceUserFunction)(state.customer, action.payload)
      });

    case "ADD_CAR":
      return _objectSpread({}, state, {
        cars: (0, _userConditions.addcarfunc)(state.customer, action.payload)
      });

    case "EDIT_CAR":
      return _objectSpread({}, state, {
        cars: (0, _userConditions.editcarfunc)(state.customer, action.payload)
      });

    case "RETAIN":
      return _objectSpread({}, state);

    case "REMOVE_CAR":
      return _objectSpread({}, state, {
        cars: (0, _userConditions.removecarfunc)(state.customer, action.payload)
      });

    case "UPDATE_CAR":
      return _objectSpread({}, state, {
        temp: action.payload
      });

    case "ADD_ORDER":
      return _objectSpread({}, state, {
        customer: (0, _userConditions.updateWithOrder)(state.customer, action.payload)
      });

    case "ADD_SCHEDULE":
      return _objectSpread({}, state, {
        schedules: (0, _userConditions.addSchedulesFunc)(state.orders, action.payload)
      });
    // case "ADD_TO_CART":
    //   return {
    //     ...state,
    //     customer: addItemsToCart(state.customer, action.payload),
    //   };

    case "REFRESH_CART":
      return _objectSpread({}, state, {
        customer: (0, _userConditions.refreshCartFunc)(state.customer, action.payload)
      });

    case "REMOVE_FROM_CART":
      return _objectSpread({}, state, {
        customer: (0, _userConditions.removeFromCart)(state.customer, action.payload)
      });

    default:
      return state;
  }
};

var _default = userReducer;
exports["default"] = _default;