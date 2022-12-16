"use strict";

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useForm = function useForm() {
  var _useState = (0, _react.useState)({
    carId: history.location.state === undefined ? "" : history.location.state.id,
    carname: history.location.state === undefined ? "" : history.location.state.details,
    house_no: history.location.state === undefined ? "" : history.location.state.houseName,
    street: history.location.state === undefined ? "" : history.location.state.streetName,
    pincode: history.location.state === undefined ? "" : history.location.state.pincode,
    landmark: history.location.state === undefined ? "" : history.location.state.society,
    cartypes: CarTypes,
    detectaddress: "",
    lat: "",
    "long": "",
    cartype: history.location.state === undefined ? "" : history.location.state.carType,
    vehicleno: history.location.state === undefined ? "" : history.location.state.vehicleno,
    carmodel: history.location.state === undefined ? "" : history.location.state.carmodel
  }),
      _useState2 = _slicedToArray(_useState, 2),
      CarDetails = _useState2[0],
      setCarDetails = _useState2[1];

  var _useState3 = (0, _react.useState)({
    carId: history.location.state === undefined ? "" : history.location.state.id,
    carname: history.location.state === undefined ? "" : history.location.state.details,
    house_no: history.location.state === undefined ? "" : history.location.state.houseName,
    street: history.location.state === undefined ? "" : history.location.state.streetName,
    pincode: history.location.state === undefined ? "" : history.location.state.pincode,
    landmark: history.location.state === undefined ? "" : history.location.state.society,
    cartypes: CarTypes,
    detectaddress: "",
    lat: "",
    "long": "",
    cartype: history.location.state === undefined ? "" : history.location.state.carType,
    vehicleno: history.location.state === undefined ? "" : history.location.state.vehicleno,
    carmodel: history.location.state === undefined ? "" : history.location.state.carmodel
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      TempCarDetails = _useState4[0];
};