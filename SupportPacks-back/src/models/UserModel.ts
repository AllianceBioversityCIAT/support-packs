import { Model, DataTypes } from "sequelize";
import { database } from "../_helpers/db";
import {
    Length,
    IsEmail,
    IsOptional,
} from 'class-validator';
import * as bcrypt from "bcryptjs";

export class User extends Model {
    public id!: number;
    @Length(3, 20)
    public first_name!: string;
    @Length(3, 20)
    public last_name!: string;
    @IsEmail()
    public email!: string;
    @IsOptional()
    public password!: any;
    public readonly registeredAt!: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        last_name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        registeredAt: {
            type: new DataTypes.DATE(),
            allowNull: true
        },
    },
    {
        tableName: "sp_person",
        sequelize: database, // this bit is important
    }
);

User.sync({ force: false }).then(() => console.log("Users table created"));