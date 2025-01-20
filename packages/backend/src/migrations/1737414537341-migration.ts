import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737414537341 implements MigrationInterface {
	name = 'Migration1737414537341';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "type" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "type"`);
	}
}
