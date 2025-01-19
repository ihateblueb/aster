import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737157474109 implements MigrationInterface {
	name = 'Migration1737157474109';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "meta" ("id" character varying NOT NULL, "name" character varying NOT NULL DEFAULT 'Aster', "description" character varying NOT NULL DEFAULT 'An instance on the fediverse running Aster', CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "meta"`);
	}
}
