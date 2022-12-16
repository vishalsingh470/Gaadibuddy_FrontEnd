"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.refreshCartFunc = exports.addItemsToCart = exports.replaceUserFunction = exports.editcarfunc = exports.updateWithOrder = exports.addSchedulesFunc = exports.removecarfunc = exports.addcarfunc = void 0;

var _UserActions = require("./UserActions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var addcarfunc = function addcarfunc(customer, newcar) {
  customer.cars.push(newcar);
}; // export const addaddressfunc = (prevaddress, newaddress) => {
//   return [...prevaddress, newaddress];
// };


exports.addcarfunc = addcarfunc;

var removecarfunc = function removecarfunc(customer, cartoberemoved) {
  var items = customer.cars.filter(function (item) {
    return item.id !== cartoberemoved;
  });
  customer.cars = [];
  items.map(function (item) {
    return customer.cars.push(item);
  });
};

exports.removecarfunc = removecarfunc;

var addSchedulesFunc = function addSchedulesFunc(prevSchedules, newId) {
  if (prevSchedules === undefined && newId === null && prevSchedules.length === null) {
    return [prevSchedules, newId];
  } else {
    for (var i = 0; i < prevSchedules.length; i++) {
      if (prevSchedules[i].id !== newId.id) return [].concat(_toConsumableArray(prevSchedules), [newId]);else return prevSchedules;
    }
  }
};

exports.addSchedulesFunc = addSchedulesFunc;

var updateWithOrder = function updateWithOrder(Customer, newOrder) {
  console.log("before", Customer);

  for (var i = 0; i < Customer.cars.length; i++) {
    if (Customer.cars[i].id === newOrder.carId) {
      Customer.cars[i].orders.push(newOrder);
    }
  }

  console.log("after", Customer);
  return Customer;
};

exports.updateWithOrder = updateWithOrder;

var editcarfunc = function editcarfunc(prevCustomer, editedCar) {
  var updatedCars = prevCustomer.cars.map(function (onecar) {
    return onecar.id === editedCar.id ? editedCar : onecar;
  });
  prevCustomer.cars = [];
  updatedCars.map(function (car) {
    return prevCustomer.cars.push(car);
  });
}; // export const removeaddressfunc = (prevaddress, addresstoberemoved) => {
//   const items = prevaddress.filter((item) => item.id !== addresstoberemoved);
//   return items;
// };


exports.editcarfunc = editcarfunc;

var replaceUserFunction = function replaceUserFunction(user, newUser) {
  user.name = newUser.name;
  user.mobileNo = newUser.mobileNo;
  user.email = newUser.email;
  return user;
};

exports.replaceUserFunction = replaceUserFunction;

var addItemsToCart = function addItemsToCart(CartItems, CartItemToAdd) {
  var existingCartItem = CartItems.find(function (CartItem) {
    return CartItem.carId === CartItemToAdd.carId && CartItem.service === CartItemToAdd.service && CartItem.serviceStartDate === CartItemToAdd.serviceStartDate && CartItem["package"] === CartItemToAdd["package"];
  });

  if (existingCartItem) {
    alert("already added to cart");
    return CartItems;
  }

  return [].concat(_toConsumableArray(CartItems), [CartItemToAdd]);
};

exports.addItemsToCart = addItemsToCart;

var refreshCartFunc = function refreshCartFunc(user, newCart) {
  user.cart = newCart;
  return user;
};

exports.refreshCartFunc = refreshCartFunc;

var removeFromCart = function removeFromCart(customer, RemoveItem) {
  var index = customer.cart.indexOf(RemoveItem);
  console.log(index);
  customer.cart.splice(index, 1);
  return customer;
};

exports.removeFromCart = removeFromCart;