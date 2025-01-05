import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735484050103 implements MigrationInterface {
	name = 'Migration1735484050103';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_fa2a29de1c200eceab227268adb"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_66cc0f1e288b3c5c25576da2a98"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_66cc0f1e288b3c5c25576da2a9"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_fa2a29de1c200eceab227268ad"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_3217f2327716d73db1d28ce3bc8"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_fa2a29de1c200eceab227268adb" PRIMARY KEY ("driveFileId")`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP COLUMN "noteId"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_fa2a29de1c200eceab227268adb"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP COLUMN "driveFileId"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD "driveFileId_1" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_4a83f1a3b06dcc1825d4f045d49" PRIMARY KEY ("driveFileId_1")`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD "driveFileId_2" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_4a83f1a3b06dcc1825d4f045d49"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_92fbcee5338639067665fde1ba8" PRIMARY KEY ("driveFileId_1", "driveFileId_2")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4a83f1a3b06dcc1825d4f045d4" ON "attachmentIds" ("driveFileId_1") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_cf41955343ac5681b21278b4c7" ON "attachmentIds" ("driveFileId_2") `
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_4a83f1a3b06dcc1825d4f045d49" FOREIGN KEY ("driveFileId_1") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_cf41955343ac5681b21278b4c73" FOREIGN KEY ("driveFileId_2") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_cf41955343ac5681b21278b4c73"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "FK_4a83f1a3b06dcc1825d4f045d49"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_cf41955343ac5681b21278b4c7"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_4a83f1a3b06dcc1825d4f045d4"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_92fbcee5338639067665fde1ba8"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_4a83f1a3b06dcc1825d4f045d49" PRIMARY KEY ("driveFileId_1")`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP COLUMN "driveFileId_2"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_4a83f1a3b06dcc1825d4f045d49"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP COLUMN "driveFileId_1"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD "driveFileId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_fa2a29de1c200eceab227268adb" PRIMARY KEY ("driveFileId")`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD "noteId" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" DROP CONSTRAINT "PK_fa2a29de1c200eceab227268adb"`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "PK_3217f2327716d73db1d28ce3bc8" PRIMARY KEY ("noteId", "driveFileId")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_fa2a29de1c200eceab227268ad" ON "attachmentIds" ("driveFileId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_66cc0f1e288b3c5c25576da2a9" ON "attachmentIds" ("noteId") `
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_66cc0f1e288b3c5c25576da2a98" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "attachmentIds" ADD CONSTRAINT "FK_fa2a29de1c200eceab227268adb" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}
}
