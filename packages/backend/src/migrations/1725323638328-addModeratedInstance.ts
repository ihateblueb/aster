import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModeratedInstance1725323638328 implements MigrationInterface {
	name = 'AddModeratedInstance1725323638328';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "moderated_instance" ("id" character varying NOT NULL, "host" character varying NOT NULL, "blocked" boolean NOT NULL DEFAULT false, "silenced" boolean NOT NULL DEFAULT false, "forcedVisibility" boolean NOT NULL DEFAULT false, "imported" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0519d349186e8d527ad831ea18b" UNIQUE ("host"), CONSTRAINT "PK_9ea53bb754447cba5bd85493aad" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "instance" DROP COLUMN "suspended"`
		);
		await queryRunner.query(
			`ALTER TABLE "instance" DROP COLUMN "silenced"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instance" ADD "silenced" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(
			`ALTER TABLE "instance" ADD "suspended" boolean NOT NULL DEFAULT false`
		);
		await queryRunner.query(`DROP TABLE "moderated_instance"`);
	}
}
