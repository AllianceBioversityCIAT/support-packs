"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var db_1 = require("../_helpers/db");
var class_validator_1 = require("class-validator");
var bcrypt = require("bcryptjs");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 8);
    };
    User.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        class_validator_1.Length(3, 20)
    ], User.prototype, "first_name");
    __decorate([
        class_validator_1.Length(3, 20)
    ], User.prototype, "last_name");
    __decorate([
        class_validator_1.IsEmail()
    ], User.prototype, "email");
    __decorate([
        class_validator_1.Length(8, 20)
    ], User.prototype, "password");
    return User;
}(sequelize_1.Model));
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    last_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    registeredAt: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: true
    }
}, {
    tableName: "sp_person",
    sequelize: db_1.database
});
User.sync({ force: false }).then(function () { return console.log("Users table created"); });
