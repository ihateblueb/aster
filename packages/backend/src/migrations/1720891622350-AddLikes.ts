import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikes1720891622350 implements MigrationInterface {
	name = 'AddLikes1720891622350';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "note_like" ("id" character varying NOT NULL, "ap_id" character varying NOT NULL, "note" character varying NOT NULL, "created_at" character varying NOT NULL, "user" character varying NOT NULL, CONSTRAINT "UQ_e809a01b84fa6ed81a951903720" UNIQUE ("ap_id"), CONSTRAINT "PK_dcb2c1593ba4264ea3954fa605e" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "note_like"`);
	}
}
