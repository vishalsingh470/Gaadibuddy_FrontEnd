"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyCart = exports.UpdateFromCart = exports.refreshCart = exports.AddToCart = exports.CartToggle = void 0;

var CartToggle = function CartToggle() {
  return {
    type: "CART_TOGGLE"
  };
};

exports.CartToggle = CartToggle;

var AddToCart = function AddToCart(item) {
  return {
    type: "ADD_TO_CART",
    payload: item
  };
};

exports.AddToCart = AddToCart;

var refreshCart = function refreshCart(cartArray) {
  return {
    type: "REFRESH_CART",
    payload: cartArray
  };
}; // export const RemoveFromCart = (item) => {
//   return {
//     type: "REMOVE_FROM_CART",
//     payload: item,
//   };
// };


exports.refreshCart = refreshCart;

var UpdateFromCart = function UpdateFromCart(item) {
  return {
    type: "UPDATE_FROM_CART",
    payload: item
  };
};

exports.UpdateFromCart = UpdateFromCart;

var emptyCart = function emptyCart() {
  return {
    type: "EMPTY_CART"
  };
};

exports.emptyCart = emptyCart;