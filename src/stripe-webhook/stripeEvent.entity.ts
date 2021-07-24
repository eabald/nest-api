import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StripeEvent {
  @PrimaryColumn()
  public id: string;
}
