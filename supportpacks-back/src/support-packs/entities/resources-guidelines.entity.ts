
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Guideline } from './guideline.entity';

@Table({ tableName: 'sp_resources_guidelines', timestamps: false })
export class ResourcesGuidelines extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column({ defaultValue: true })
    public active: boolean;

    @Length({ min: 3, max: 20 })
    @Column
    public name: string;

    @Length({ min: 3, max: 20 })
    @Column
    public code: string;

    @Length({ min: 3, max: 20 })
    @Column
    public source: string;

    @Length({ min: 3, max: 20 })
    @Column
    public type: string;
  
    @BelongsTo(() => Guideline)
    guideline: Guideline;
  
    @ForeignKey(() => Guideline)
    @PrimaryKey
    @Column
    guideline_id: number;

    

}
