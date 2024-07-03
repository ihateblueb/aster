import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Activity {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column('jsonb')
	object: string;
}
