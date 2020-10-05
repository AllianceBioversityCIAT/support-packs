import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();
export const database = new Sequelize(`mysql://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});