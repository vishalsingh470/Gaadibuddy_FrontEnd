"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseUrl = void 0;

var __DEV__ = document.domain === "localhost";

var baseUrl = __DEV__ ? "http://localhost:9000/api/" : "api/"; // export const baseUrl = "http://15.206.187.119:9000/api/";

exports.baseUrl = baseUrl;