import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736845852034 implements MigrationInterface {
	name = 'Migration1736845852034';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP COLUMN "attachmentIds"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "attachmentIds" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying array`
		);
	}
}
