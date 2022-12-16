"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ScrollToTop;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

function ScrollToTop() {
  var _useLocation = (0, _reactRouterDom.useLocation)(),
      pathname = _useLocation.pathname;

  console.log(pathname);
  (0, _react.useEffect)(function () {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}