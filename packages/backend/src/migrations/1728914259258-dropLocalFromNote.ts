import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropLocalFromNote1728914259258 implements MigrationInterface {
	name = 'DropLocalFromNote1728914259258';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "local"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "local" boolean NOT NULL DEFAULT false`
		);
	}
}
