import {
  AutoIncrement,
  Column,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

var bcrypt = require('bcryptjs');

@Table({ tableName: 'sp_users', timestamps: false })
export class Auth extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Length({ min: 3, max: 20 })
  @Column
  public first_name: string;

  @Length({ min: 3, max: 20 })
  @Column
  public last_name: string;

  @Column
  public email: string;

  @Column
  public password: string;

  @Column
  public is_cgiar: boolean;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
