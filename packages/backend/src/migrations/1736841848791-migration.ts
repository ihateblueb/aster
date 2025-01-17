import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736841848791 implements MigrationInterface {
	name = 'Migration1736841848791';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_0c8a7a2aacde26464cd1cd83f78"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_ef2f26e3b95aba28ee1a2f18dfb"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_ef2f26e3b95aba28ee1a2f18df"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_0c8a7a2aacde26464cd1cd83f7"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_942bfc6e8714bf0345998e6d40b"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_0c8a7a2aacde26464cd1cd83f78" PRIMARY KEY ("attachmentIds_2")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds_1"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_0c8a7a2aacde26464cd1cd83f78"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds_2"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachmentIds" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_048e86f11925d47f8895c381d43" PRIMARY KEY ("attachmentIds")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "driveFileIds" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_048e86f11925d47f8895c381d43"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_649ac05af65c8e062274ec29b9f" PRIMARY KEY ("attachmentIds", "driveFileIds")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_048e86f11925d47f8895c381d4" ON "note_attachments" ("attachmentIds") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_59cf146e9e8cf2dd161a6eed8b" ON "note_attachments" ("driveFileIds") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_048e86f11925d47f8895c381d43" FOREIGN KEY ("attachmentIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_59cf146e9e8cf2dd161a6eed8b0" FOREIGN KEY ("driveFileIds") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_59cf146e9e8cf2dd161a6eed8b0"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_048e86f11925d47f8895c381d43"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_59cf146e9e8cf2dd161a6eed8b"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_048e86f11925d47f8895c381d4"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_649ac05af65c8e062274ec29b9f"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_048e86f11925d47f8895c381d43" PRIMARY KEY ("attachmentIds")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "driveFileIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_048e86f11925d47f8895c381d43"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachmentIds_2" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_0c8a7a2aacde26464cd1cd83f78" PRIMARY KEY ("attachmentIds_2")`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD "attachmentIds_1" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_0c8a7a2aacde26464cd1cd83f78"`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_942bfc6e8714bf0345998e6d40b" PRIMARY KEY ("attachmentIds_1", "attachmentIds_2")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c8a7a2aacde26464cd1cd83f7" ON "note_attachments" ("attachmentIds_2") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ef2f26e3b95aba28ee1a2f18df" ON "note_attachments" ("attachmentIds_1") `
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_ef2f26e3b95aba28ee1a2f18dfb" FOREIGN KEY ("attachmentIds_1") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_0c8a7a2aacde26464cd1cd83f78" FOREIGN KEY ("attachmentIds_2") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}
}
