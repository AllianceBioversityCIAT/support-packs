
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript';
import { App } from './app.entity';
import { DownloadGuidelines } from './download-guidelines.entity';
import { ImportanceLevel } from './importance-level.entity';

@Table({tableName: 'sp_guidelines'})
export class Guideline extends Model {

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

    @ForeignKey(() => App)
    @Column
    public app_id: number;

    @CreatedAt
    @Column({defaultValue: sequelize.literal("now()")})
    createdAt: Date;

    @UpdatedAt
    @Column({defaultValue: sequelize.literal("now()")})
    updatedAt: Date;


    // Relations
    @HasMany(() => ImportanceLevel)
    importance_levels: ImportanceLevel;

    @HasMany(() => DownloadGuidelines)
    downloads: DownloadGuidelines[];
}