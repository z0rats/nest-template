import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from './base/base-entity.orm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  tg: string;
}
