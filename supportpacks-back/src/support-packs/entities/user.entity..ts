
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt,IsEmail } from 'sequelize-typescript';
var bcrypt = require('bcryptjs');

@Table({tableName: 'sp_person', timestamps:false})
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Length({min: 3, max: 20})
    @Column
    public first_name: string;

    @Length({min: 3, max: 20})
    @Column
    public last_name: string;

    @IsEmail
    @Column
    public email: string;

    @Column
    public password: string;

    @CreatedAt
    @Column({defaultValue: sequelize.literal("now()")})
    registeredAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}