import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ModeratedInstance {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	host: string;

	@Column({ nullable: true })
	cw: string;

	@Column({ default: false })
	sensitive: boolean;

	@Column({ default: true })
	deliver: boolean;

	@Column({ default: true })
	accept: boolean;

	@Column({ default: true })
	fetch: boolean;

	@Column({ default: true })
	return: boolean;
}
