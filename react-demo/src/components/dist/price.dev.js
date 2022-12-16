"use strict";
//Check Vishal
Object.defineProperties(exports, "__esModule",{
    value: true
});
exports.DurationPrice = exports.CarTypePrice = exports.ServicePrice = void 0;

var ServicePrice = function ServicePrice(service) {
  var servicePrice = 0;

  switch (service) {
    case 'ONE TIME':
      {
        return servicePrice = 300;
      }

    case 'SILVER':
      {
        return servicePrice = 400;
      }

    case 'GOLD':
      {
        return servicePrice = 500;
      }

    case 'PLATINUM':
      {
        return servicePrice = 600;
      }

    case 'SANITIZATION':
      {
        return servicePrice = 300;
      }

    case 'EXTERIOR':
      {
        return servicePrice = 200;
      }

    case 'INTERIOR':
      {
        return servicePrice = 500;
      }

    default:
      {
        return servicePrice = 0;
      }
  }
};

exports.ServicePrice = ServicePrice;

var CarTypePrice = function CarTypePrice(category) {
  var cartypePrice = 0;

  switch (category) {
    case "HATCHBACK":
      {
        return cartypePrice = 300;
      }

    case "SEDAN":
      {
        return cartypePrice = 400;
      }

    case "SUV":
      {
        return cartypePrice = 500;
      }

    case "PREMIUM":
      {
        return cartypePrice = 600;
      }

    default:
      {
        return cartypePrice = 0;
      }
  }
};

exports.CarTypePrice = CarTypePrice;

var DurationPrice = function DurationPrice(duration, price) {
  var durationPrice = 0;

  switch (duration) {
    case "ONE TIME":
      {
        durationPrice = price;
        return durationPrice;
      }

    case "MONTHLY":
      {
        durationPrice = price;
        return durationPrice;
      }

    case "QUARTERLY":
      {
        durationPrice = price * 3;
        return durationPrice;
      }

    case "HALF YEARLY":
      {
        durationPrice = price * 6;
        return durationPrice;
      }

    case "YEARLY":
      {
        durationPrice = price * 12;
        return durationPrice;
      }

    default:
      {
        return durationPrice = 0;
      }
  }
};

exports.DurationPrice = DurationPrice;