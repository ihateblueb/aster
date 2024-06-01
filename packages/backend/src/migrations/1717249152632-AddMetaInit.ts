import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetaInit1717249152632 implements MigrationInterface {
	name = 'AddMetaInit1717249152632';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "init" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "init"`);
	}
}
