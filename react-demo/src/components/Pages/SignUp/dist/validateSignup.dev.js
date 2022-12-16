"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Validate;

function Validate(Item) {
  var errors = {};

  if (!Item.email) {
    errors.email = "Email is Required";
  } else if (!/\S+@\S+\.\S+/.test(Item.email)) {
    errors.email = "Email address is invalid";
  }

  if (!Item.password) {
    errors.password = "Password is required";
  } else if (Item.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  }

  if (!Item.name) {
    errors.name = "name is required";
  } else if (Item.name.length < 3) {
    errors.name = "name needs to be more than 3 characters";
  }

  if (!Item.phone) {
    errors.phone = "Phone number is required";
  } else if (Item.phone.length !== 10) {
    errors.phone = "Phone number needs to be 10 numbers";
  }

  return errors;
}