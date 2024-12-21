import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734813174297 implements MigrationInterface {
	name = 'Migration1734813174297';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_like" ADD CONSTRAINT "UQ_f673d8c5e202cd1d47124041f7c" UNIQUE ("apId")`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_like" DROP CONSTRAINT "UQ_f673d8c5e202cd1d47124041f7c"`
		);
		await queryRunner.query(`ALTER TABLE "note_like" DROP COLUMN "apId"`);
	}
}
