"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import AuthController from "../controllers/AuthController";
var checkJwt_1 = require("../middlewares/checkJwt");
var SPController_1 = require("../controllers/SPController");
var router = express_1.Router();
// guidelines
router.get("/guidelines/:app_id", SPController_1["default"].getGuidelines);
// categories
router.get("/categories/:app_id", SPController_1["default"].getCategories);
// regions
router.get("/regions", SPController_1["default"].getRegions);
// roles
router.get("/roles/:app_id", SPController_1["default"].getRoles);
// stages
router.get("/stages/:app_id", SPController_1["default"].getStages);
// set downloads
router.post('/download', SPController_1["default"].downloadManager);
// person
//  get
router.post("/person/info", SPController_1["default"].getPersonInfo);
// create
router.post("/person/create", [checkJwt_1.checkJwt], SPController_1["default"].createPerson);
// guidelines by : role, stage and category
router.post("/guidelines/byRSC", SPController_1["default"].getGuidelinesByRoleStageCategory);
router.get("/guidelines-all/:userId?", SPController_1["default"].getAllGuidelines);
// get importance level
router.post("/importance-level", SPController_1["default"].getImportanceLevel);
// update importance level
router.put("/importance-level", SPController_1["default"].updateImportanceLevel);
exports["default"] = router;
