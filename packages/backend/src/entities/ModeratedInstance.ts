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

	@Column({ default: false })
	suspend: boolean;

	@Column({ default: false })
	silence: boolean;
}
