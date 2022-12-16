"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _errorActions = require("../../../Redux/Error/errorActions");

var _UserActions = require("../../../Redux/UserRedux/UserActions");

var _variables = require("../../../variables/variables");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useFormSignup = function useFormSignup(callback, ValidateSignUp) {
  var _useState = (0, _react.useState)({
    email: "",
    password: "",
    name: "",
    phone: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      ItemSingUp = _useState2[0],
      setItem = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      errorSignUp = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSubmitting = _useState6[0],
      SetisSubmitting = _useState6[1];

  var handleChangeUp = function handleChangeUp(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value; //destructured here

    setItem(_objectSpread({}, ItemSingUp, _defineProperty({}, name, value)));
  };

  var dispatch = (0, _reactRedux.useDispatch)();

  var handleSubmitUp = function handleSubmitUp(e) {
    var response, responseData;
    return regeneratorRuntime.async(function handleSubmitUp$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            setError(ValidateSignUp(ItemSingUp));
            SetisSubmitting(true);
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fetch("".concat(_variables.baseUrl.toString(), "users/signup"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: ItemSingUp.name,
                mobileNo: ItemSingUp.phone,
                email: ItemSingUp.email,
                password: ItemSingUp.password
              })
            }));

          case 6:
            response = _context.sent;
            _context.next = 9;
            return regeneratorRuntime.awrap(response.json());

          case 9:
            responseData = _context.sent;
            console.log(responseData);

            if (!(responseData.customer !== undefined)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return regeneratorRuntime.awrap(dispatch((0, _UserActions.isLogged)(responseData.customer)));

          case 14:
            _context.next = 18;
            break;

          case 16:
            _context.next = 18;
            return regeneratorRuntime.awrap(dispatch((0, _errorActions.setMyError)(responseData)));

          case 18:
            setTimeout(function () {
              dispatch((0, _errorActions.resetMyError)());
            }, 5000); //dispatch item and push to add car page

            _context.next = 26;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            dispatch((0, _errorActions.setMyError)(_context.t0));
            setTimeout(function () {
              dispatch((0, _errorActions.resetMyError)());
            }, 5000);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 21]]);
  };

  (0, _react.useEffect)(function () {
    if (Object.keys(errorSignUp).length === 0 && isSubmitting) {
      callback();
    }
  }, [errorSignUp, callback, isSubmitting]);
  return {
    handleChangeUp: handleChangeUp,
    handleSubmitUp: handleSubmitUp,
    ItemSingUp: ItemSingUp,
    errorSignUp: errorSignUp
  };
};

var _default = useFormSignup;
exports["default"] = _default;