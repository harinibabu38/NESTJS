 import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GameEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  genre!: string;
}