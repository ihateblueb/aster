import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWidthsAndHeightsAndLocal1723063001312
	implements MigrationInterface
{
	name = 'AddWidthsAndHeightsAndLocal1723063001312';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "width" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "height" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "thumbnail_width" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "thumbnail_height" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "thumbnail_height"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "thumbnail_width"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "height"`
		);
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "width"`);
	}
}
