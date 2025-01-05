import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735483778090 implements MigrationInterface {
	name = 'Migration1735483778090';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "attachmentIds" ("noteId" character varying NOT NULL, "driveFileId" character varying NOT NULL, CONSTRAINT "PK_3217f2327716d73db1d28ce3bc8" PRIMARY KEY ("noteId", "driveFileId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_66cc0f1e288b3c5c25576da2a9" ON "attachmentIds" ("noteId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_fa2a29de1c200eceab227268ad" ON "attachmentIds" ("driveFileId") `
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_66cc0f1e288b3c5c25576da2a98" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_fa2a29de1c200eceab227268adb" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_fa2a29de1c200eceab227268adb"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_66cc0f1e288b3c5c25576da2a98"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_fa2a29de1c200eceab227268ad"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_66cc0f1e288b3c5c25576da2a9"`
		);
		await queryRunner.query(`DROP TABLE "attachmentIds"`);
	}
}
