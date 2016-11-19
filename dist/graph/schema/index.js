'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Public GraphQL schema.
*/

exports.default = (0, _graphql.buildSchema)(_fs2.default.readFileSync(_path2.default.join(__dirname, 'index.graphql'), 'utf-8'));