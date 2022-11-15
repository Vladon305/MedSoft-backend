import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type MessageType = 'income' | 'outcome' | 'draft';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  type: MessageType;

  @Column({ nullable: true })
  file?: string;
}
