
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Download } from './download.entity';
import { Guideline } from './guideline.entity';
import { ImportanceLevel } from './importance-level.entity';
import { Region } from './region.entity';

@Table({ tableName: 'sp_download_regions', timestamps: false })
export class DownloadRegions extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @BelongsTo(() => Download)
    download: Download;
  
    @ForeignKey(() => Download)
    @PrimaryKey
    @Column
    downloadId: number;
  
    @BelongsTo(() => Region)
    region: Region;
  
    @ForeignKey(() => Region)
    @PrimaryKey
    @Column
    regionId: number;

    @Column
    public scope: string;

}
