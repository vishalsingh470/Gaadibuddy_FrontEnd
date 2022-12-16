"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Validate;

function Validate(Item) {
  var errors = {};

  if (!Item.cartype) {
    errors.phone = "Phone number is required";
  } else if (Item.phone.length !== 10) {
    errors.phone = "Phone number need to be 10 characters";
  }

  if (!Item.password) {
    errors.password = "Password is required";
  } else if (Item.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  }

  return errors;
}