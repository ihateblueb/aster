import typeorm, { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Note } from './Note.js';

@Entity()
export class Poll {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ select: false })
	noteId: string;

	@ManyToOne(() => Note, (note) => note, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'noteId' })
	note: typeorm.Relation<Note>;

    // todo: think of if this is reasonable

	@Column({ array: true })
	key: string;

    @Column({ array: true })
	value: string;

    @Column({ array: true, nullable: true })
	correctness: string;
}
