import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736839559773 implements MigrationInterface {
	name = 'Migration1736839559773';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_a83da7eefcf03c23c270e936d21"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_a83da7eefcf03c23c270e936d2"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" RENAME COLUMN "attachmentId" TO "driveFileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" RENAME CONSTRAINT "PK_e41fd15037d48dddc58e2aae396" TO "PK_24d1170576078dd6efd984b22e1"`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dd60d4adc8e73b7ae339ba9beb" ON "note_attachments" ("driveFileId") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dd60d4adc8e73b7ae339ba9beb"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" RENAME CONSTRAINT "PK_24d1170576078dd6efd984b22e1" TO "PK_e41fd15037d48dddc58e2aae396"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" RENAME COLUMN "driveFileId" TO "attachmentId"`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a83da7eefcf03c23c270e936d2" ON "note_attachments" ("attachmentId") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_a83da7eefcf03c23c270e936d21" FOREIGN KEY ("attachmentId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}
}
