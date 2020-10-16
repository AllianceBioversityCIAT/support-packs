import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();
export const database = new Sequelize(`mysql://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}:${process.env.DB_PORT}/${process.env.DB}`, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});