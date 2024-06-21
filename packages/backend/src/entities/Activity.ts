import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Activity {
	@PrimaryColumn()
	id: string;

	@Column()
	object: object;
}
