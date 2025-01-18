import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Meta {
	@PrimaryColumn({ default: 'Aster' })
	name: string;

	@Column({ default: 'An instance on the fediverse running Aster' })
	description: string;

	@Column({ nullable: true })
	maintainer: string;

	@Column({ nullable: true })
	maintainerEmail: string;
}
