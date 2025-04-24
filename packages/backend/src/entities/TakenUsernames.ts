import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TakenUsernames {
    @PrimaryColumn()
    username: string;
}