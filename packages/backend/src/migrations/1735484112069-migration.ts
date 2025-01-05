import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735484112069 implements MigrationInterface {
	name = 'Migration1735484112069';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "note_attachments_drive_file" ("driveFileId_1" character varying NOT NULL, "driveFileId_2" character varying NOT NULL, CONSTRAINT "PK_7c70951426d34d0e4afcbaf751b" PRIMARY KEY ("driveFileId_1", "driveFileId_2"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2538c189eb27d4af26c995a397" ON "note_attachments_drive_file" ("driveFileId_1") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b851db20171765bd6defa66bcd" ON "note_attachments_drive_file" ("driveFileId_2") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments_drive_file" ADD CONSTRAINT "FK_2538c189eb27d4af26c995a3979" FOREIGN KEY ("driveFileId_1") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments_drive_file" ADD CONSTRAINT "FK_b851db20171765bd6defa66bcd6" FOREIGN KEY ("driveFileId_2") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments_drive_file" DROP CONSTRAINT "FK_b851db20171765bd6defa66bcd6"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments_drive_file" DROP CONSTRAINT "FK_2538c189eb27d4af26c995a3979"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b851db20171765bd6defa66bcd"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_2538c189eb27d4af26c995a397"`
		);
		await queryRunner.query(`DROP TABLE "note_attachments_drive_file"`);
	}
}
