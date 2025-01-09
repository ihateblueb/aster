import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736437504705 implements MigrationInterface {
	name = 'Migration1736437504705';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "report" ("id" character varying NOT NULL, "apId" character varying NOT NULL, "fromId" character varying NOT NULL, "userId" character varying NOT NULL, "noteId" character varying NOT NULL, "content" character varying, "createdAt" character varying NOT NULL, CONSTRAINT "UQ_91de46301fbc7f93317d74f2002" UNIQUE ("apId"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD "apId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_4cad336ebe28964a7bb7d5772c4" UNIQUE ("apId")`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_6d0120a45153fafa5a64ec6caa0" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "report" ADD CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_5c07dd4a48586355aff4c6afcac"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`
		);
		await queryRunner.query(
			`ALTER TABLE "report" DROP CONSTRAINT "FK_6d0120a45153fafa5a64ec6caa0"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_4cad336ebe28964a7bb7d5772c4"`
		);
		await queryRunner.query(`ALTER TABLE "note_react" DROP COLUMN "apId"`);
		await queryRunner.query(`DROP TABLE "report"`);
	}
}
