"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _UserActions = require("../../../Redux/UserRedux/UserActions");

var _errorActions = require("../../../Redux/Error/errorActions");

var _variables = require("../../../variables/variables");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useForm = function useForm(callback, Validate) {
  var _useState = (0, _react.useState)({
    phone: "",
    password: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      Item = _useState2[0],
      setItem = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSubmitting = _useState6[0],
      SetisSubmitting = _useState6[1];

  var handleChange = function handleChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value; //destructured here

    setItem(_objectSpread({}, Item, _defineProperty({}, name, value)));
  };

  var dispatch = (0, _reactRedux.useDispatch)();

  function handleSubmit(e) {
    var response, responseData;
    return regeneratorRuntime.async(function handleSubmit$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            setError(Validate(Item));
            SetisSubmitting(true);
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fetch("".concat(_variables.baseUrl.toString(), "users/login"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                mobileNo: Item.phone,
                password: Item.password
              })
            }));

          case 6:
            response = _context.sent;
            _context.next = 9;
            return regeneratorRuntime.awrap(response.json());

          case 9:
            responseData = _context.sent;
            console.log(responseData); // removed later

            if (responseData.customer !== undefined) {
              dispatch((0, _UserActions.isLogged)(responseData.customer));
              alert("Logged In");
            } else {
              dispatch((0, _errorActions.setMyError)(responseData));
              setTimeout(function () {
                dispatch((0, _errorActions.resetMyError)());
              }, 10000);
            }

            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            dispatch((0, _errorActions.setMyError)(_context.t0));
            setTimeout(function () {
              dispatch((0, _errorActions.resetMyError)());
            }, 10000);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 14]]);
  } //dispatch prevebent with recieved array from backend


  (0, _react.useEffect)(function () {
    if (Object.keys(error).length === 0 && isSubmitting) {
      callback();
    }
  }, [error, callback, isSubmitting]);
  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    Item: Item,
    error: error
  };
};

var _default = useForm;
exports["default"] = _default;