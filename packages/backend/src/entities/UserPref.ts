import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UsersPref {
	@PrimaryColumn()
	id: string;

	@Column('text', { array: true, nullable: true })
	prefs: string[];
}
