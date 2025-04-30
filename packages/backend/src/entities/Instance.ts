import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Instance {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	host: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	software: string;

	@Column({ nullable: true })
	version: string;

	@Column({ nullable: true })
	maintainer: string;

	@Column({ nullable: true })
	maintainerEmail: string;

	@Column({ default: true })
	deliverActivities: boolean;
}
