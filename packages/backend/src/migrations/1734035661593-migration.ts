import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734035661593 implements MigrationInterface {
	name = 'Migration1734035661593';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "poll" DROP CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" RENAME COLUMN "noteId" TO "hasCorrectAnswer"`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "driveFileIds" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" DROP COLUMN "hasCorrectAnswer"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" ADD "hasCorrectAnswer" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "poll" DROP COLUMN "hasCorrectAnswer"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" ADD "hasCorrectAnswer" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP COLUMN "driveFileIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" RENAME COLUMN "hasCorrectAnswer" TO "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "poll" ADD CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
