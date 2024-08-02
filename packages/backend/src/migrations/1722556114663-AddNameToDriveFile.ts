import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToDriveFile1722556114663 implements MigrationInterface {
	name = 'AddNameToDriveFile1722556114663';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "name" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "name"`);
	}
}
