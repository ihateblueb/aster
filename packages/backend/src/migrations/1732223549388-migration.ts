import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732223549388 implements MigrationInterface {
	name = 'Migration1732223549388';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "suspend"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "silence"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "deliver" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "accept" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "fetch" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "return" boolean NOT NULL DEFAULT true`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "return"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "fetch"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "accept"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" DROP COLUMN "deliver"`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "silence" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "moderated_instance" ADD "suspend" boolean NOT NULL DEFAULT false`
		);
	}
}
