
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Guideline } from './guideline.entity';
import { Role } from './role.entity';
import { Stage } from './stage.entity';

@Table({tableName: 'sp_importance_levels', timestamps:false})
export class ImportanceLevel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @ForeignKey(() => Guideline)
    @Column
    guideline_id: number;

    @ForeignKey(() => Category)
    @Column
    category_id: number;

    @ForeignKey(() => Stage)
    @Column
    stage_id: number;
    
    @ForeignKey(() => Role)
    @Column
    role_id: number;

    @Column(DataType.ENUM('Very important', 'Important', 'Useful', 'Optional'))
    importance_level;


}