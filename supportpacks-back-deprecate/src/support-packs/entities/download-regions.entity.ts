
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Download } from './download.entity';
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
    download_id: number;
  
    @BelongsTo(() => Region)
    region: Region;
  
    @ForeignKey(() => Region)
    @PrimaryKey
    @Column
    region_id: number;

    @Column
    public region_scope: string;

}
