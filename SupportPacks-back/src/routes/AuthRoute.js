"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import AuthController from "../controllers/AuthController";
var checkJwt_1 = require("../middlewares/checkJwt");
var AuthController_1 = require("../controllers/AuthController");
var router = express_1.Router();
// test route
// router.get("/test", AuthController.test);
// Login route
router.post("/login", AuthController_1["default"].login);
// Change password
router.post("/change-password", [checkJwt_1.checkJwt], AuthController_1["default"].changePassword);
// Validate token
router.get("/validate-token", [checkJwt_1.checkJwt], AuthController_1["default"].validateToken);
exports["default"] = router;
