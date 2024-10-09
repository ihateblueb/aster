import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNote1728438511305 implements MigrationInterface {
	name = 'AddNote1728438511305';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "note" ("id" character varying NOT NULL, "apId" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, "visibility" character varying NOT NULL DEFAULT 'public', "content" character varying NOT NULL, "userId" character varying, CONSTRAINT "UQ_5ca0d9f67267a9d248f1e30fbb6" UNIQUE ("apId"), CONSTRAINT "REL_5b87d9d19127bd5d92026017a7" UNIQUE ("userId"), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`
		);
		await queryRunner.query(`DROP TABLE "note"`);
	}
}
