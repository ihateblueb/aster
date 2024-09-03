import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ModeratedInstance {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	host: string;

	@Column({ default: false })
	blocked: boolean;

	@Column({ default: false })
	silenced: boolean;

	@Column({ default: false })
	forcedVisibility: boolean;

	@Column({ default: false })
	imported: boolean;
}
