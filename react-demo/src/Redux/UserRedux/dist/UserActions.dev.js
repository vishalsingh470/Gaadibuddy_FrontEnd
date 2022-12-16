"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetainUser = exports.UpdateFromCart = exports.RemoveFromCart = exports.refreshCart = exports.CartToggle = exports.updateCar = exports.addSchedules = exports.addOrder = exports.removeCar = exports.editCar = exports.addCar = exports.editUser = exports.isLoggedout = exports.isLogged = void 0;

var isLogged = function isLogged(customer) {
  return {
    type: "LOGGED_IN",
    payload: customer
  };
};

exports.isLogged = isLogged;

var isLoggedout = function isLoggedout(customer) {
  return {
    type: "LOGGED_OUT"
  };
};

exports.isLoggedout = isLoggedout;

var editUser = function editUser(customer) {
  return {
    type: "EDIT_USER",
    payload: customer
  };
};

exports.editUser = editUser;

var addCar = function addCar(carArray) {
  return {
    type: "ADD_CAR",
    payload: carArray
  };
};

exports.addCar = addCar;

var editCar = function editCar(carObject) {
  return {
    type: "EDIT_CAR",
    payload: carObject
  };
};

exports.editCar = editCar;

var removeCar = function removeCar(carobj) {
  return {
    type: "REMOVE_CAR",
    payload: carobj
  };
};

exports.removeCar = removeCar;

var addOrder = function addOrder(orderobj) {
  return {
    type: "ADD_ORDER",
    payload: orderobj
  };
};

exports.addOrder = addOrder;

var addSchedules = function addSchedules(eventobj) {
  return {
    type: "ADD_SCHEDULE",
    payload: eventobj
  };
};

exports.addSchedules = addSchedules;

var updateCar = function updateCar(tempobj) {
  return {
    type: "UPDATE_CAR",
    payload: tempobj
  };
};

exports.updateCar = updateCar;

var CartToggle = function CartToggle() {
  return {
    type: "CART_TOGGLE"
  };
};

exports.CartToggle = CartToggle;

var refreshCart = function refreshCart(cartArray) {
  return {
    type: "REFRESH_CART",
    payload: cartArray
  };
};

exports.refreshCart = refreshCart;

var RemoveFromCart = function RemoveFromCart(item) {
  return {
    type: "REMOVE_FROM_CART",
    payload: item
  };
};

exports.RemoveFromCart = RemoveFromCart;

var UpdateFromCart = function UpdateFromCart(item) {
  return {
    type: "UPDATE_FROM_CART",
    payload: item
  };
};

exports.UpdateFromCart = UpdateFromCart;

var RetainUser = function RetainUser(carArray) {
  return {
    type: "RETAIN"
  };
};

exports.RetainUser = RetainUser;