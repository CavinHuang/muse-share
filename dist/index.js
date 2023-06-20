"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/is/index.ts
var prototype = Object.prototype;
var isType = (val, type) => prototype.toString.call(val) === `[object ${type}]`;
var isString = (val) => isType(val, "String" /* String */);
var isDate = (val) => isType(val, "Date" /* Date */);
var isNumber = (val) => isType(val, "Number" /* Number */);
var isNull = (val) => isType(val, "Null" /* Null */);
var isArray = (val) => Array.isArray(val);






exports.isArray = isArray; exports.isDate = isDate; exports.isNull = isNull; exports.isNumber = isNumber; exports.isString = isString;
