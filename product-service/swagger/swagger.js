// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Shop API",
    "version": "1"
  },
  "paths": {
    "/products": {
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/CreateProductBody"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Product saved successfully!",
            "schema": {
              "$ref": "#/definitions/ProductSaved"
            }
          },
          "400": {
            "description": "Create product request failed with error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "There was some error, retry later!",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "get": {
        "summary": "productList",
        "description": "",
        "operationId": "productList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Products fetched successfully!",
            "schema": {
              "$ref": "#/definitions/ProductWithStock"
            }
          }
        }
      }
    },
    "/products/{id}": {
      "get": {
        "summary": "productById",
        "description": "",
        "operationId": "productById.get./products/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Product found!",
            "schema": {
              "$ref": "#/definitions/ProductById"
            }
          },
          "404": {
            "description": "No such product found!",
            "schema": {
              "$ref": "#/definitions/NotFound"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "ProductsList": {
      "properties": {
        "message": {
          "title": "ProductsList.message",
          "type": "string"
        },
        "data": {
          "items": {
            "$ref": "#/definitions/ProductWithStock"
          },
          "title": "ProductsList.data",
          "type": "array"
        }
      },
      "required": [
        "message",
        "data"
      ],
      "additionalProperties": false,
      "title": "ProductsList",
      "type": "object"
    },
    "ProductById": {
      "properties": {
        "message": {
          "title": "ProductById.message",
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/Product",
          "title": "ProductById.data"
        }
      },
      "required": [
        "message",
        "data"
      ],
      "additionalProperties": false,
      "title": "ProductById",
      "type": "object"
    },
    "NotFound": {
      "properties": {
        "message": {
          "title": "NotFound.message",
          "type": "string"
        },
        "data": {
          "title": "NotFound.data",
          "nullable": true
        }
      },
      "required": [
        "message",
        "data"
      ],
      "additionalProperties": false,
      "title": "NotFound",
      "type": "object"
    },
    "Error": {
      "properties": {
        "message": {
          "title": "Error.message",
          "type": "string"
        },
        "error": {
          "title": "Error.error",
          "type": "string"
        }
      },
      "required": [
        "message",
        "error"
      ],
      "additionalProperties": false,
      "title": "Error",
      "type": "object"
    },
    "ProductSaved": {
      "properties": {
        "message": {
          "title": "ProductSaved.message",
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/Product",
          "title": "ProductSaved.data"
        }
      },
      "required": [
        "message",
        "data"
      ],
      "additionalProperties": false,
      "title": "ProductSaved",
      "type": "object"
    },
    "CreateProductBody": {
      "properties": {
        "title": {
          "title": "CreateProductBody.title",
          "type": "string"
        },
        "description": {
          "title": "CreateProductBody.description",
          "type": "string"
        },
        "price": {
          "title": "CreateProductBody.price",
          "type": "number"
        }
      },
      "required": [
        "title",
        "description",
        "price"
      ],
      "additionalProperties": false,
      "title": "CreateProductBody",
      "type": "object"
    },
    "ProductWithStock": {
      "allOf": [
        {
          "$ref": "#/definitions/Product"
        },
        {
          "properties": {
            "count": {
              "title": "count",
              "type": "number"
            }
          },
          "required": [
            "count"
          ],
          "additionalProperties": false,
          "type": "object"
        }
      ],
      "title": "ProductWithStock"
    },
    "Product": {
      "properties": {
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        }
      },
      "required": [
        "description",
        "id",
        "price",
        "title"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};