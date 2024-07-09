import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmojisToNotes1720283675471 implements MigrationInterface {
	name = 'AddEmojisToNotes1720283675471';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" ADD "emojis" jsonb`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "emojis"`);
	}
}
