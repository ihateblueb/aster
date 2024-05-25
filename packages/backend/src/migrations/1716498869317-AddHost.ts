import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHost1716498869317 implements MigrationInterface {
	name = 'AddHost1716498869317';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "host" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "host"`);
	}
}
