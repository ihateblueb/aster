import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersPref {
	@PrimaryColumn()
	id: string;
}
