"use strict";
exports.__esModule = true;
var express_1 = require("express");
var AuthRoute_1 = require("./AuthRoute");
var SPRoute_1 = require("./SPRoute");
var routes = express_1.Router();
routes.use("/auth", AuthRoute_1["default"]);
routes.use("/sp", SPRoute_1["default"]);
exports["default"] = routes;
