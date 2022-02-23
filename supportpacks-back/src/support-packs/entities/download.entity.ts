
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany } from 'sequelize-typescript';
import { DownloadGuidelines } from './download-guidelines.entity';
import { ImportanceLevel } from './importance-level.entity';

@Table({ tableName: 'sp_download', timestamps: false })
export class Download extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public user_id: number;

    @Column
    public institute: string;
    
    @Column
    public intended_use: string;
    
    @CreatedAt
    @Column({defaultValue: sequelize.literal("now()")})
    date: Date;
    
    @Column
    public filter_type: boolean;

    @HasMany(() => DownloadGuidelines)
    downloads: DownloadGuidelines[];
}
