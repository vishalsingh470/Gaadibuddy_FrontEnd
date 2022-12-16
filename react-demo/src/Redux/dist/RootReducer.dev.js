"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _UserReducer = _interopRequireDefault(require("./UserRedux/UserReducer"));

var _errorReducer = _interopRequireDefault(require("./Error/errorReducer"));

var _CartReducer = _interopRequireDefault(require("./cart/CartReducer"));

var _calenderReducer = _interopRequireDefault(require("./calender/calenderReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//sessionstorage can be used here
var persistConfig = {
  key: "root",
  storage: _storage["default"],
  whitelist: ["cart", "user", "calender", "error"] //remove from whitelist to remove persist

};
var RootReducer = (0, _redux.combineReducers)({
  user: _UserReducer["default"],
  error: _errorReducer["default"],
  cart: _CartReducer["default"],
  calender: _calenderReducer["default"]
});

var _default = (0, _reduxPersist.persistReducer)(persistConfig, RootReducer);

exports["default"] = _default;