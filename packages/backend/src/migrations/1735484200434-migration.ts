import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735484200434 implements MigrationInterface {
	name = 'Migration1735484200434';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "note_attachments" ("driveFileId" character varying NOT NULL, "attachment" character varying NOT NULL, CONSTRAINT "PK_29836b2f46471cfdff4db2b713f" PRIMARY KEY ("driveFileId", "attachment"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dd60d4adc8e73b7ae339ba9beb" ON "note_attachments" ("driveFileId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5d36f5e39bcaf62b95aca2d270" ON "note_attachments" ("attachment") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_5d36f5e39bcaf62b95aca2d2704" FOREIGN KEY ("attachment") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_5d36f5e39bcaf62b95aca2d2704"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_5d36f5e39bcaf62b95aca2d270"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dd60d4adc8e73b7ae339ba9beb"`
		);
		await queryRunner.query(`DROP TABLE "note_attachments"`);
	}
}
