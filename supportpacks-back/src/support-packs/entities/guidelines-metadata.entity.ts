
import sequelize from 'sequelize';
import { Table, Column, Model, Length, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Default, Sequelize, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Guideline } from './guideline.entity';

@Table({ tableName: 'sp_guidelines_metadata', timestamps: false })
export class GuidelinesMetadata extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;
  
    @BelongsTo(() => Guideline)
    guideline: Guideline;
  
    @ForeignKey(() => Guideline)
    @PrimaryKey
    @Column
    guideline_id: number;

    @Column
    public description: string;

    @Column
    public target_scale: string;

    @Column
    public integrates_gender: string;
    
    @Column
    public participants: string;

    @Column
    public methods: string;

    @Column
    public input_types: string;

    @Column
    public expected_outputs: string;

    @Column
    public human_resources: string;

    @Column
    public estimated_time: string;

    @Column
    public strengths: string;

    @Column
    public limitations: string;

    @Column
    public is_tested_online: string;

    @Column
    public key_references: string;


}
