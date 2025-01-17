import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736844346045 implements MigrationInterface {
	name = 'Migration1736844346045';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_59cf146e9e8cf2dd161a6eed8b0"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_048e86f11925d47f8895c381d43"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_048e86f11925d47f8895c381d4"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_59cf146e9e8cf2dd161a6eed8b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_649ac05af65c8e062274ec29b9f"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_59cf146e9e8cf2dd161a6eed8b0" PRIMARY KEY ("driveFileIds")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_59cf146e9e8cf2dd161a6eed8b0"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "driveFileIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "driveFileId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1" PRIMARY KEY ("driveFileId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_24d1170576078dd6efd984b22e1" PRIMARY KEY ("driveFileId", "noteId")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dd60d4adc8e73b7ae339ba9beb" ON "note_attachments" ("driveFileId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_cbbbcdc5cf6e96561145f77941" ON "note_attachments" ("noteId") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_cbbbcdc5cf6e96561145f77941"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_dd60d4adc8e73b7ae339ba9beb"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_24d1170576078dd6efd984b22e1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1" PRIMARY KEY ("driveFileId")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "driveFileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "driveFileIds" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_59cf146e9e8cf2dd161a6eed8b0" PRIMARY KEY ("driveFileIds")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachmentIds" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_59cf146e9e8cf2dd161a6eed8b0"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_649ac05af65c8e062274ec29b9f" PRIMARY KEY ("attachmentIds", "driveFileIds")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_59cf146e9e8cf2dd161a6eed8b" ON "note_attachments" ("driveFileIds") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_048e86f11925d47f8895c381d4" ON "note_attachments" ("attachmentIds") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_048e86f11925d47f8895c381d43" FOREIGN KEY ("attachmentIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_59cf146e9e8cf2dd161a6eed8b0" FOREIGN KEY ("driveFileIds") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}
}
