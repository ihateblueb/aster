import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNoteStats1716400795056 implements MigrationInterface {
	name = 'AddNoteStats1716400795056';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "notes" ADD "replies" text array`);
		await queryRunner.query(`ALTER TABLE "notes" ADD "repeats" text array`);
		await queryRunner.query(`ALTER TABLE "notes" ADD "quotes" text array`);
		await queryRunner.query(`ALTER TABLE "notes" ADD "likes" text array`);
		await queryRunner.query(
			`ALTER TABLE "notes" ADD "reactions" text array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "reactions"`);
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "likes"`);
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "quotes"`);
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "repeats"`);
		await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "replies"`);
	}
}
