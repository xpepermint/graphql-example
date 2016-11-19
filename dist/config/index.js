"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const env = exports.env = process.env.npm_package_config_env;
const httpPort = exports.httpPort = process.env.npm_package_config_httpPort;
const httpHost = exports.httpHost = process.env.npm_package_config_httpHost;
const mongoUrl = exports.mongoUrl = process.env.npm_package_config_mongoUrl;