import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735483559569 implements MigrationInterface {
	name = 'Migration1735483559569';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying array`
		);
	}
}
