/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./data/products.js":
/*!**************************!*\
  !*** ./data/products.js ***!
  \**************************/
/***/ ((module) => {

eval("module.exports = [\r\n  {\r\n    description: \"Product 1 Description\",\r\n    id: \"1\",\r\n    price: 24,\r\n    title: \"Product 1\",\r\n  },\r\n  {\r\n    description: \"Product 2 Description\",\r\n    id: \"2\",\r\n    price: 15,\r\n    title: \"Product 2\",\r\n  },\r\n  {\r\n    description: \"Product 3 Description\",\r\n    id: \"3\",\r\n    price: 23,\r\n    title: \"Product 3\",\r\n  },\r\n  {\r\n    description: \"Product 4 Description\",\r\n    id: \"4\",\r\n    price: 15,\r\n    title: \"Product 4\",\r\n  },\r\n  {\r\n    description: \"Product 5 Description\",\r\n    id: \"5\",\r\n    price: 23,\r\n    title: \"Product 5\",\r\n  },\r\n  {\r\n    description: \"Product 6 Description\",\r\n    id: \"6\",\r\n    price: 15,\r\n    title: \"Product 6\",\r\n  },\r\n];\r\n\n\n//# sourceURL=webpack:///./data/products.js?");

/***/ }),

/***/ "./src/common/createSuccessResponse.js":
/*!*********************************************!*\
  !*** ./src/common/createSuccessResponse.js ***!
  \*********************************************/
/***/ ((module) => {

eval("module.exports = (message, data, statusCode = 200) => ({\r\n  statusCode,\r\n  body: JSON.stringify({ message, data }),\r\n});\r\n\n\n//# sourceURL=webpack:///./src/common/createSuccessResponse.js?");

/***/ }),

/***/ "./src/constants/responses.js":
/*!************************************!*\
  !*** ./src/constants/responses.js ***!
  \************************************/
/***/ ((module) => {

eval("module.exports = {\r\n  PRODUCT_NOT_FOUND: \"No such product found!\",\r\n  PRODUCT_FOUND: \"Product found!\",\r\n  PRODUCTS_FETCHED: \"Products fetched successfully!\",\r\n};\r\n\n\n//# sourceURL=webpack:///./src/constants/responses.js?");

/***/ }),

/***/ "./src/handlers/productList/index.js":
/*!*******************************************!*\
  !*** ./src/handlers/productList/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\nconst products = __webpack_require__(/*! ../../../data/products */ \"./data/products.js\");\r\nconst createSuccessResponse = __webpack_require__(/*! ../../common/createSuccessResponse */ \"./src/common/createSuccessResponse.js\");\r\nconst { PRODUCTS_FETCHED } = __webpack_require__(/*! ../../constants/responses */ \"./src/constants/responses.js\");\r\n\r\nconst handler = async (event) => {\r\n  return createSuccessResponse(PRODUCTS_FETCHED, products, 200);\r\n};\r\n\r\nmodule.exports = { handler };\r\n\n\n//# sourceURL=webpack:///./src/handlers/productList/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handlers/productList/index.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;