import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserPref {
	@PrimaryColumn()
	id: string;

	@Column('text', { array: true, nullable: true })
	prefs: string[];
}
