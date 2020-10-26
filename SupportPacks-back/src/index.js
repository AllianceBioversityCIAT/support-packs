"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var routes_1 = require("./routes");
require('dotenv').config();
// dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
var parentDir = require('path').resolve(process.cwd(), '../');
var PORT = parseInt(process.env.PORT, 10);
var HOST = process.env.LOCALHOST;
// console.log(parentDir)
// Create a new express application instance
var app = express_1["default"]();
// Call midlewares
app.use(cors_1["default"]());
app.use(helmet_1["default"]({ frameguard: false }));
app.use(body_parser_1["default"].json());
app.use(express_1["default"].static(parentDir + '/supportpacks-front/dist/mel-cop/'));
//routes
app.use("/api", routes_1["default"]);
// console.log(HOST, PORT)
// app.get('/melsp', (req, res) => {
//     res.sendFile(parentDir + "/supportpacks-front/dist/melsp/index.html")
// });
// app.get('/dmsp', (req, res) => {
//     res.sendFile(parentDir + "/supportpacks-front/dist/dmsp/index.html")
// });
app.get('/', function (req, res) {
    res.sendFile(parentDir + "/supportpacks-front/dist/mel-cop/index.html");
});
// 404 catch 
app.all('*', function (req, res) {
    console.log("[TRACE] Server 404 request: " + req.originalUrl);
    res.status(200).sendFile(parentDir + "/supportpacks-front/dist/mel-cop/index.html");
});
app.use(function (err, req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    console.log(err);
});
app.listen(PORT, "" + HOST, function () {
    console.log("Current parent directory: " + parentDir + " ");
    console.log("Server started on port " + PORT + " and host " + HOST + "!");
});
