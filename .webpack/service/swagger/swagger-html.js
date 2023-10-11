/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./swagger/swagger-html.js":
/*!*********************************!*\
  !*** ./swagger/swagger-html.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.handler = async () => {\n    return {\n        statusCode: 200,\n        body: swaggerUI,\n        headers: {\n            'content-type': 'text/html',\n        },\n    };\n};\nconst swaggerUI = `<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>SwaggerUI</title>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css\"\n    />\n    <script src=\"https://unpkg.com/react@15/dist/react.min.js\"></script>\n    <script src=\"https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js\"></script>\n    <script src=\"https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js\"></script>\n    <script defer>\n      window.onload = () => {\n        const h = React.createElement\n        const ui = SwaggerUIBundle({\n          url: window.location.href + '.json',\n          dom_id: '#swagger-ui',\n          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset, \n        system => {\n            // Variable to capture the security prop of OperationSummary\n            // then pass it to authorizeOperationBtn\n            let currentSecurity\n            return {\n                wrapComponents: {\n                    // Wrap OperationSummary component to get its prop\n                    OperationSummary: Original => props => {\n                        const security = props.operationProps.get('security')\n                        currentSecurity = security.toJS()\n                        return h(Original, props)\n                    },\n                    // Wrap the padlock button to show the\n                    // scopes required for current operation\n                    authorizeOperationBtn: Original =>\n                        function (props) {\n                            return h('div', {}, [\n                                ...(currentSecurity || []).map(scheme => {\n                                    const schemeName = Object.keys(scheme)[0]\n                                    if (!scheme[schemeName].length) return null\n\n                                    const scopes = scheme[schemeName].flatMap(scope => [\n                                        h('code', null, scope),\n                                        ', ',\n                                    ])\n                                    scopes.pop()\n                                    return h('span', null, scopes)\n                                }),\n                                h(Original, props),\n                            ])\n                        },\n                },\n            }\n        }],\n          layout: 'StandaloneLayout',\n        });\n        window.ui = ui;\n      };\n    </script>\n  </head>\n  <body>\n    <div id=\"swagger-ui\"></div>\n  </body>\n</html>\n`;\n\n\n//# sourceURL=webpack:///./swagger/swagger-html.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./swagger/swagger-html.js"](0, __webpack_exports__);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;