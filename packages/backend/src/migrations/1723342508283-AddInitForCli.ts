import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitForCli1723342508283 implements MigrationInterface {
	name = 'AddInitForCli1723342508283';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "meta" ADD "init" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "init"`);
	}
}
