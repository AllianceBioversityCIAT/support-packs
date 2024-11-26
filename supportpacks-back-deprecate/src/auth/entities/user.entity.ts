import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sp_users')
export class sp_users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    name: 'is_cgiar',
    type: 'boolean',
    default: true,
  })
  is_cgiar: boolean;

  // is_active: boolean;
}
