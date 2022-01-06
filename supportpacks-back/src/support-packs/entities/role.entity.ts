
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { App } from './app.entity';
import { ImportanceLevel } from './importance-level.entity';

@Table({ tableName: 'sp_roles', timestamps: false })
export class Role extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Length({ min: 1, max: 4 })
    @Column
    public acronym: string;

    @Column
    public name: string;

    @ForeignKey(() => App)
    @Column
    public app_id: number;

    // Relations
    @HasMany(() => ImportanceLevel)
    importance_levels: ImportanceLevel;

}