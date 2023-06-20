"use strict";
var MUtil = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    isArray: () => isArray,
    isDate: () => isDate,
    isNull: () => isNull,
    isNumber: () => isNumber,
    isString: () => isString
  });

  // src/is/index.ts
  var prototype = Object.prototype;
  var isType = (val, type) => prototype.toString.call(val) === `[object ${type}]`;
  var isString = (val) => isType(val, "String" /* String */);
  var isDate = (val) => isType(val, "Date" /* Date */);
  var isNumber = (val) => isType(val, "Number" /* Number */);
  var isNull = (val) => isType(val, "Null" /* Null */);
  var isArray = (val) => Array.isArray(val);
  return __toCommonJS(src_exports);
})();
