import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNoteEdits1717603191712 implements MigrationInterface {
	name = 'AddNoteEdits1717603191712';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "notes_edit" ("id" character varying NOT NULL, "note" character varying, "created_at" character varying, "cw" text array, "content" character varying, "permissions" text array, CONSTRAINT "PK_fdade8b9bb8cef45a19b8f72568" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`ALTER TABLE "notes" ADD "edits" text array`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "edits"`);
		await queryRunner.query(`DROP TABLE "notes_edit"`);
	}
}
