import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDriveFileType1720277329937 implements MigrationInterface {
	name = 'AddDriveFileType1720277329937';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "type" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "type"`);
	}
}
