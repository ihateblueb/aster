import { MigrationInterface, QueryRunner } from 'typeorm';

export class OhOopsImMissingSomeStuff1723063058799
	implements MigrationInterface
{
	name = 'OhOopsImMissingSomeStuff1723063058799';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "local" boolean NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "local"`);
	}
}
