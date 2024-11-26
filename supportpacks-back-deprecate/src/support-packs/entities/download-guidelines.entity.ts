
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Download } from './download.entity';
import { Guideline } from './guideline.entity';
import { ImportanceLevel } from './importance-level.entity';

@Table({ tableName: 'sp_download_guidelines', timestamps: false })
export class DownloadGuidelines extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @BelongsTo(() => Download)
    download: Download;
  
    @ForeignKey(() => Download)
    @PrimaryKey
    @Column
    download_id: number;
  
    @BelongsTo(() => Guideline)
    guideline: Guideline;
  
    @ForeignKey(() => Guideline)
    @PrimaryKey
    @Column
    guideline_id: number;


}
