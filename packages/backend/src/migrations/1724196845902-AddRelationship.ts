import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationship1724196845902 implements MigrationInterface {
	name = 'AddRelationship1724196845902';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "relationship" ("id" character varying NOT NULL, "created_at" character varying NOT NULL, "to" character varying NOT NULL, "from" character varying NOT NULL, "pending" character varying NOT NULL DEFAULT false, "severed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_67eb56a3f16da3d901a8ae446a6" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "relationship"`);
	}
}
