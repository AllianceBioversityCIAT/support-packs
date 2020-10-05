import { Length } from 'class-validator';
import { Model } from 'sequelize';

export class Guidelines extends Model{
    public id!: number;
    public active!: boolean;
    @Length(3, 20)
    public name!: string;
    @Length(3, 20)
    public code!: string;
    @Length(3, 20)
    public source!: string;
    @Length(3, 20)
    public type!: string;
    public app_id!: number;
}

export default Guidelines;