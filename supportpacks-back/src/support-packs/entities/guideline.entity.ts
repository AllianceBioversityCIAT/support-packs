
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, BelongsTo, HasMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { App } from './app.entity';
import { DownloadGuidelines } from './download-guidelines.entity';
import { GuidelinesMetadata } from './guidelines-metadata.entity';
import { ImportanceLevel } from './importance-level.entity';

@Table({tableName: 'sp_guidelines'})
export class Guideline extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column({ defaultValue: true })
    public active: boolean;

    @Column
    public name: string;

    @Column
    public code: string;

    @Column
    public source: string;

    @Column
    public type: string;

    @Column
    registered_by: string;

    @Column
    contact: string;

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
    
    @HasOne(() => GuidelinesMetadata)
    metadata: GuidelinesMetadata[];
}