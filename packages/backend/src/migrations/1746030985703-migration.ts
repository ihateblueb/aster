import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746030985703 implements MigrationInterface {
	name = 'Migration1746030985703';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "policy" ("id" character varying NOT NULL, "type" character varying NOT NULL, "host" character varying, "regex" character varying, "cw" character varying, CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "instance" ADD "deliverActivities" boolean NOT NULL DEFAULT true`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "instance" DROP COLUMN "deliverActivities"`
		);
		await queryRunner.query(`DROP TABLE "policy"`);
	}
}
