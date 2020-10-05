import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { validate } from "class-validator";
import { User } from "../models/UserModel";
import { QueryTypes } from "sequelize";

import { database } from '../_helpers/db';

dotenv.config();

class AuthController {
    static validateToken = async (req: Request, res: Response) => {
        try {
            res.status(200).json(true)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // login 
    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(500).json(`user ${email} and password ${password} not found.`);
            // res.status(400).send();
        }

        try {
            //Get user from database
            const user = await User.findOne({ where: { email } });
            //Check if encrypted password match
            if (!user?.checkIfUnencryptedPasswordIsValid(password)) {
                res.status(401).send();
                return;
            }

            //Sing JWT, valid for 1 hour
            user.password = undefined;
            let tkn = process.env.jwtSecret + '';
            const token = jwt.sign(
                { userId: user.id, email: user?.email },
                tkn,
                { expiresIn: "1h" }
            );

            //Send the jwt in the response
            res.send({ token, user });
        } catch (error) {
            console.log(error)
            res.status(401).send();
        }

    };


    // change password
    static changePassword = async (req: Request, res: Response) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        try {
            const user = await User.findOne({ where: { id } });
            //Check if old password matchs
            if (!user?.checkIfUnencryptedPasswordIsValid(oldPassword)) {
                res.status(401).send();
                return;
            }
            //Validate de model (password lenght)
            user.password = newPassword;
            const errors = await validate(user);
            if (errors.length > 0) {
                res.status(400).json(errors);
                return;
            }
            //Hash the new password and save
            user.hashPassword();

            user.save();

            res.status(204).send();
        } catch (error) {
            console.log(error)
            res.status(401).json(error);
        }


    };
}
export default AuthController;