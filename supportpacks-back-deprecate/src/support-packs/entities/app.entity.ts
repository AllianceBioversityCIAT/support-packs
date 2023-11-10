
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Guideline } from './guideline.entity';
import { ImportanceLevel } from './importance-level.entity';
import { Role } from './role.entity';
import { Stage } from './stage.entity';

@Table({ tableName: 'sp_apps', timestamps: false })
export class App extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public name: string;

    // Relations
    @HasMany(() => Category)
    importance_levels: Category;

    @HasMany(() => Category)
    categories: Category;
    
    @HasMany(() => Role)
    roles: Role;
    
    @HasMany(() => Stage)
    stages: Stage;
    
    @HasMany(() => Guideline)
    guidelines: Guideline;
    
}