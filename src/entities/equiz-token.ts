/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EQuizToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  block_number: number;
  @Column({ nullable: true })
  block_hash: string;
  @Column({ nullable: true })
  transaction_hash: string;
  @Column({ nullable: true })
  transferToken_event: string;
  @Column({ nullable: true })
  playerScore_event: string;
  @Column({ nullable: true })
  contract_address: string;
  @Column({ nullable: true })
  from_address: string;
  @Column({ nullable: true })
  to_address: string;
  @Column({ nullable: true })
  transfer_amount: string;
  @Column({ nullable: true })
  player_address: string;
  @Column({ nullable: true })
  player_score: string;
}
