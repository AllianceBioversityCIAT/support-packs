"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var dotenv = require("dotenv");
var db_1 = require("../_helpers/db");
var GuideLinesModel_1 = require("../models/GuideLinesModel");
var UserModel_1 = require("../models/UserModel");
var class_validator_1 = require("class-validator");
var moment_1 = require("moment");
// import { sign } from "crypto";
// import { ne, lte } from "sequelize/types/lib/operators";
dotenv.config();
var SupportPackController = /** @class */ (function () {
    function SupportPackController() {
    }
    SupportPackController.formatAllGuidances = function (guides, guidesStages) {
        var result = [];
        var _loop_1 = function (index) {
            var element = guides[index];
            var guideStages = guidesStages.filter(function (gS) { return gS.id == element.id; });
            element['stages'] = this_1.groupBy(guideStages, 'stage');
        };
        var this_1 = this;
        for (var index = 0; index < guides.length; index++) {
            _loop_1(index);
        }
        return guides;
    };
    SupportPackController.groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    ;
    SupportPackController.getGuidelines = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var app_id, guidelines, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app_id = req.params.app_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_guidelines WHERE app_id = :app_id ORDER BY code', {
                            mapToModel: true,
                            model: GuideLinesModel_1["default"],
                            replacements: { app_id: app_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    guidelines = _a.sent();
                    res.status(200).json(guidelines);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(500).json(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    SupportPackController.updateImportanceLevel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, importanceL, impLevel, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, id = _a.id, importanceL = _a.importanceL;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_importance_levels WHERE id =:id ORDER BY code', {
                            replacements: { id: id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    impLevel = _b.sent();
                    console.log(impLevel, importanceL);
                    // impLevel = importanceL;
                    res.status(200).json(impLevel);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.status(500).json(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    SupportPackController.getGuidelinesByRoleStageCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, role, stage, category, sqlQuery, guidelinesByRoleStageCategory, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, role = _a.role, stage = _a.stage, category = _a.category;
                    sqlQuery = "SELECT\n                        g.id,\n                        g.code,\n                        (REPLACE(g.code, \".\", \"\")) as \"composedCode\",\n                            g.name,\n                            g.type,\n                            TRIM(g.source) AS \"source\",\n                            il.importance_level as \"level\",\n                            (\n                                CASE il.importance_level\n                                WHEN 4 THEN \"Very Important\"\n                                WHEN 3 THEN \"Important\"\n                                WHEN 2 THEN \"Useful\"\n                                WHEN 1 THEN \"Optional\"\n                                END\n                            ) AS \"importance_level\"\n                        FROM\n                            sp_importance_levels il\n                        INNER JOIN sp_categories c ON il.category_id = c.id\n                        INNER JOIN sp_stages s ON il.stage_id = s.id\n                        INNER JOIN sp_roles r ON il.role_id = r.id\n                        INNER JOIN sp_guidelines g ON il.guideline_id = g.id\n                        WHERE\n                            il.role_id = :role\n                        AND il.stage_id = :stage\n                        AND il.category_id = :category\n                        AND g.active = 1\n                        ORDER BY\n                            composedCode\n                        ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { role: role, stage: stage, category: category },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    guidelinesByRoleStageCategory = _b.sent();
                    res.status(200).json(guidelinesByRoleStageCategory);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.log(error_3);
                    res.status(500).json(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    SupportPackController.getAllGuidelines = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, user, sqlQuery, sqlQuery2, allGuides, allGuidesStages, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    user = null;
                    if (!userId) return [3 /*break*/, 3];
                    return [4 /*yield*/, UserModel_1.User.findOne({ where: { id: userId } })];
                case 2:
                    user = _a.sent();
                    _a.label = 3;
                case 3:
                    sqlQuery = "SELECT\n                                g.id,\n                                g.code,\n                                (REPLACE(g.code, \".\", \"\")) as \"composedCode\",\n                                g.name,\n                                g.type,\n                                g.active,\n                                TRIM(g.source) AS \"source\"\n                            FROM\n                                sp_guidelines g\n                            " + (user ? '' : 'WHERE g.active = 1') + "\n                            ORDER BY composedCode\n                            ";
                    sqlQuery2 = "SELECT\n                                g.id,\n                                s.name as \"stage\",\n                                (REPLACE(g.code, \".\", \"\")) as \"composedCode\",\n                                r.name as role,\n                                (\n                                    CASE il.importance_level\n                                    WHEN  \"Very important\" THEN 4\n                                    WHEN \"Important\" THEN 3\n                                    WHEN \"Useful\" THEN 2\n                                    WHEN \"Optional\" THEN 1\n                                    END\n                                ) AS \"importance_level\"\n                            FROM\n                                sp_importance_levels il\n                            INNER JOIN sp_categories c ON il.category_id = c.id\n                            INNER JOIN sp_stages s ON il.stage_id = s.id\n                            INNER JOIN sp_roles r ON il.role_id = r.id\n                            INNER JOIN sp_guidelines g ON il.guideline_id = g.id\n                            " + (user ? '' : 'WHERE g.active = 1') + "\n                            ORDER BY composedCode\n                            ";
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: {},
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 4:
                    allGuides = _a.sent();
                    return [4 /*yield*/, db_1.database.query(sqlQuery2, {
                            replacements: {},
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 5:
                    allGuidesStages = _a.sent();
                    response = SupportPackController.formatAllGuidances(allGuides, allGuidesStages);
                    // console.log(response)
                    res.status(200).json(response);
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).json(error_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Get importance level
    SupportPackController.getImportanceLevel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, gId, sId, rId, sqlQuery, importanceLevel, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, gId = _a.gId, sId = _a.sId, rId = _a.rId;
                    sqlQuery = "\n                    SELECT\n                        id,\n                        guideline_id,\n                        category_id,\n                        stage_id,\n                        role_id,\n                        importance_level as \"level\"\n                        , (\n                            CASE importance_level\n                            WHEN 4 THEN \"Very Important\"\n                            WHEN 3 THEN \"Important\"\n                            WHEN 2 THEN \"Useful\"\n                            WHEN 1 THEN \"Optional\"\n                            END\n                        ) AS \"importance_level\"\n                    FROM\n                        sp_importance_levels\n                    WHERE\n                        guideline_id = :gId\n                    AND\n                        stage_id = :sId\n                    AND\n                        role_id = :rId\n                    ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { gId: gId, sId: sId, rId: rId },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    importanceLevel = _b.sent();
                    res.status(200).json(importanceLevel);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.log(error_5);
                    res.status(500).json(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Get Categories
    SupportPackController.getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var app_id, categories, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app_id = req.params.app_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_categories WHERE app_id = :app_id', {
                            replacements: { app_id: app_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    categories = _a.sent();
                    res.status(200).json(categories);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(500).json(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Get Regions
    SupportPackController.getRegions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var app_id, regions, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app_id = req.params.app_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_regions', {
                            replacements: { app_id: app_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    regions = _a.sent();
                    res.status(200).json(regions);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    res.status(500).json(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Get Stages
    SupportPackController.getStages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var app_id, stages, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app_id = req.params.app_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_stages WHERE app_id = :app_id', {
                            replacements: { app_id: app_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    stages = _a.sent();
                    res.status(200).json(stages);
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    res.status(500).json(error_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Get Roles
    SupportPackController.getRoles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var app_id, roles, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app_id = req.params.app_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query('SELECT * FROM  sp_roles WHERE app_id = :app_id', {
                            replacements: { app_id: app_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    roles = _a.sent();
                    res.status(200).json(roles);
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _a.sent();
                    res.status(500).json(error_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    //Get Person information
    SupportPackController.getPersonInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var email, sqlQuery, personInfo, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    sqlQuery = "\n                SELECT\n                -- Person\n                dp.id, dp.first_name, dp.last_name, dp.registeredAt, dp.email,\n                -- Download\n                dd.institute, dd.date\n                FROM\n                sp_person dp,\n                sp_download dd\n                WHERE\n                -- Person Filter\n                dp.email = :email\n                AND dp.id = dd.user_id\n                ORDER BY dd.id DESC limit 1;\n        ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { email: email },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 2:
                    personInfo = _a.sent();
                    res.status(200).json(personInfo);
                    return [3 /*break*/, 4];
                case 3:
                    error_10 = _a.sent();
                    console.log(error_10);
                    res.status(500).json(error_10);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Create Person
    SupportPackController.createPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, first_name, last_name, password;
        return __generator(this, function (_b) {
            _a = req.body, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
            try {
                SupportPackController._createPerson(email, first_name, last_name, password);
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
            return [2 /*return*/];
        });
    }); };
    SupportPackController._createPerson = function (email, first_name, last_name, password) { return __awaiter(void 0, void 0, void 0, function () {
        var newPerson, errors, response, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    newPerson = new UserModel_1.User({ email: email, first_name: first_name, last_name: last_name, password: password });
                    return [4 /*yield*/, class_validator_1.validate(newPerson)];
                case 1:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        throw new Error(errors.toString());
                    }
                    newPerson.hashPassword();
                    return [4 /*yield*/, newPerson.save()];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 3:
                    error_11 = _a.sent();
                    throw new Error(error_11);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Set Downloaded
    SupportPackController.setDownload = function (body) { return __awaiter(void 0, void 0, void 0, function () {
        var user_id, institute, intended_use, sqlQuery, newDownload, downloadsPerson, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = body.user_id, institute = body.institute, intended_use = body.intended_use;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    sqlQuery = "\n                INSERT INTO sp_download (user_id, institute, intended_use, filter_type, date)\n                VALUES (:user_id,:institute,:intended_use,:filter_type,:date)\n            ";
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { user_id: user_id, institute: institute, intended_use: intended_use, date: moment_1["default"]().toDate(), filter_type: 0 },
                            type: sequelize_1.QueryTypes.INSERT
                        })];
                case 2:
                    newDownload = _a.sent();
                    return [4 /*yield*/, db_1.database.query("\n                SELECT * FROM sp_download WHERE user_id = :user_id ORDER BY date DESC LIMIT 1\n            ", {
                            replacements: { user_id: user_id },
                            type: sequelize_1.QueryTypes.SELECT
                        })];
                case 3:
                    downloadsPerson = _a.sent();
                    return [2 /*return*/, downloadsPerson[0]];
                case 4:
                    error_12 = _a.sent();
                    console.log(error_12);
                    throw Error(error_12);
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Set Downloaded Guideline
    SupportPackController.setDownloadedGuideline = function (body) { return __awaiter(void 0, void 0, void 0, function () {
        var download_id, guideline_id, sqlQuery, downloadedGuideline, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    download_id = body.download_id, guideline_id = body.guideline_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    sqlQuery = "\n                INSERT INTO sp_download_guidelines (download_id, guideline_id)\n                VALUES (:download_id, :guideline_id)\n            ";
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { download_id: download_id, guideline_id: guideline_id },
                            type: sequelize_1.QueryTypes.INSERT
                        })];
                case 2:
                    downloadedGuideline = _a.sent();
                    return [2 /*return*/, downloadedGuideline];
                case 3:
                    error_13 = _a.sent();
                    console.log(error_13);
                    throw new Error(error_13);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Set Downloaded Region
    SupportPackController.setDownloadedRegion = function (body) { return __awaiter(void 0, void 0, void 0, function () {
        var download_id, region_id, region_scope, sqlQuery, downloadedRegion, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    download_id = body.download_id, region_id = body.region_id, region_scope = body.region_scope;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    sqlQuery = "\n                INSERT INTO sp_download_regions (download_id, region_id, region_scope)\n                VALUES (:download_id, :region_id, :region_scope)\n            ";
                    return [4 /*yield*/, db_1.database.query(sqlQuery, {
                            replacements: { download_id: download_id, region_id: region_id, region_scope: region_scope },
                            type: sequelize_1.QueryTypes.INSERT
                        })];
                case 2:
                    downloadedRegion = _a.sent();
                    return [2 /*return*/, downloadedRegion];
                case 3:
                    error_14 = _a.sent();
                    console.log(error_14);
                    throw new Error(error_14);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // download manager
    SupportPackController.downloadManager = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, first_name, last_name, email, use, guide_selected, institute_name, institute_regions, research_regions, user_id, download_id, user, promises_1, savedManager, error_15;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, use = _a.use, guide_selected = _a.guide_selected, institute_name = _a.institute_name, institute_regions = _a.institute_regions, research_regions = _a.research_regions;
                    user_id = req.body.user_id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    if (!(user_id == '' || !user_id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, SupportPackController._createPerson(email, first_name, last_name)];
                case 2:
                    user = _b.sent();
                    user_id = user.id;
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, SupportPackController.setDownload({ user_id: user_id, institute: institute_name, intended_use: use })];
                case 4:
                    download_id = _b.sent();
                    if (!download_id) return [3 /*break*/, 6];
                    promises_1 = [];
                    // Set Guidelines downloaded
                    guide_selected.forEach(function (guide) {
                        console.log(guide);
                        promises_1.push(SupportPackController.setDownloadedGuideline({ download_id: download_id['id'], guideline_id: guide }));
                    });
                    // Set region(s) where your institute is located download
                    institute_regions.forEach(function (region) {
                        promises_1.push(SupportPackController.setDownloadedRegion({ download_id: download_id['id'], region_id: region, region_scope: "instituteRegion" }));
                    });
                    // Set region(s) of your research interest download
                    research_regions.forEach(function (research) {
                        promises_1.push(SupportPackController.setDownloadedRegion({ download_id: download_id['id'], region_id: research, region_scope: "researchRegion" }));
                    });
                    return [4 /*yield*/, Promise.all(promises_1)];
                case 5:
                    savedManager = _b.sent();
                    console.log(savedManager);
                    _b.label = 6;
                case 6:
                    res.status(200).json({ download_id: download_id });
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_15 = _b.sent();
                    console.log(error_15);
                    res.status(500).json(error_15);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return SupportPackController;
}());
exports["default"] = SupportPackController;
