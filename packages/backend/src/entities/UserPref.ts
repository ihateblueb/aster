import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserPref {
	@PrimaryColumn()
	id: string;

	@Column('jsonb', { nullable: true })
	prefs: string;
}
