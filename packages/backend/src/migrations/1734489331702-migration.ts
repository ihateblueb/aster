import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734489331702 implements MigrationInterface {
	name = 'Migration1734489331702';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "width"`);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "height"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "height" integer DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "width" integer DEFAULT '0'`
		);
	}
}
