import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735484340561 implements MigrationInterface {
	name = 'Migration1735484340561';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_5d36f5e39bcaf62b95aca2d2704"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dd60d4adc8e73b7ae339ba9beb"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_5d36f5e39bcaf62b95aca2d270"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_29836b2f46471cfdff4db2b713f"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_5d36f5e39bcaf62b95aca2d2704" PRIMARY KEY ("attachment")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "driveFileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_5d36f5e39bcaf62b95aca2d2704"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachment"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_cbbbcdc5cf6e96561145f77941c" PRIMARY KEY ("noteId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachmentId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_e41fd15037d48dddc58e2aae396" PRIMARY KEY ("noteId", "attachmentId")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_cbbbcdc5cf6e96561145f77941" ON "note_attachments" ("noteId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a83da7eefcf03c23c270e936d2" ON "note_attachments" ("attachmentId") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_a83da7eefcf03c23c270e936d21" FOREIGN KEY ("attachmentId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_a83da7eefcf03c23c270e936d21"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_a83da7eefcf03c23c270e936d2"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_cbbbcdc5cf6e96561145f77941"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_e41fd15037d48dddc58e2aae396"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_cbbbcdc5cf6e96561145f77941c" PRIMARY KEY ("noteId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachmentId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachment" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_5d36f5e39bcaf62b95aca2d2704" PRIMARY KEY ("attachment")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "driveFileId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_5d36f5e39bcaf62b95aca2d2704"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_29836b2f46471cfdff4db2b713f" PRIMARY KEY ("driveFileId", "attachment")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5d36f5e39bcaf62b95aca2d270" ON "note_attachments" ("attachment") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dd60d4adc8e73b7ae339ba9beb" ON "note_attachments" ("driveFileId") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_5d36f5e39bcaf62b95aca2d2704" FOREIGN KEY ("attachment") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}
}
