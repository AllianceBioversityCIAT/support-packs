"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
require('dotenv').config();
exports.database = new sequelize_1.Sequelize("mysql://" + process.env.USER_DB + ":" + process.env.PASS_DB + "@" + process.env.HOST_DB + ":" + process.env.DB_PORT + "/" + process.env.DB, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
