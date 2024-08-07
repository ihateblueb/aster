import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddThumbnailAndBlurhash1723052165784
	implements MigrationInterface
{
	name = 'AddThumbnailAndBlurhash1723052165784';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "thumbnail" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "blurhash" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "blurhash"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "thumbnail"`
		);
	}
}
