
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany } from 'sequelize-typescript';
import { ImportanceLevel } from './importance-level.entity';

@Table({tableName: 'sp_regions', timestamps:false})
export class Region extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public code: string;
    
    @Column
    public name: string;

}