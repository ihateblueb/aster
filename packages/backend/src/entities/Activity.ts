import { Column, Entity, PrimaryColumn } from 'typeorm';

/* note: this is not to be kept long! i don't want a 
 * similar fate to other softwares that end up having massive
 * databases because they never clean up unused activities.
 * this is simply to respond to certain types of activities nicely.
 * (e.g. follow requests, which require an Accept of Reject
 * response that include the original activity. this can't be 
 * instantly accepted or rejected sometimes, so it has to be stored)
 */

@Entity()
export class Activity {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	apId: string;

	@Column()
	content: string;

	@Column()
	createdAt: string;
}
