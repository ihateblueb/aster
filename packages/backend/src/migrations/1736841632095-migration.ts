import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736841632095 implements MigrationInterface {
    name = 'Migration1736841632095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_048e86f11925d47f8895c381d43"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd60d4adc8e73b7ae339ba9beb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_048e86f11925d47f8895c381d4"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_455c6b7067dab24345b8d50bc21"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1" PRIMARY KEY ("driveFileId")`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP COLUMN "driveFileId"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD "attachmentIds_1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_ef2f26e3b95aba28ee1a2f18dfb" PRIMARY KEY ("attachmentIds_1")`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD "attachmentIds_2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_ef2f26e3b95aba28ee1a2f18dfb"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_942bfc6e8714bf0345998e6d40b" PRIMARY KEY ("attachmentIds_1", "attachmentIds_2")`);
        await queryRunner.query(`CREATE INDEX "IDX_ef2f26e3b95aba28ee1a2f18df" ON "note_attachments" ("attachmentIds_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c8a7a2aacde26464cd1cd83f7" ON "note_attachments" ("attachmentIds_2") `);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_ef2f26e3b95aba28ee1a2f18dfb" FOREIGN KEY ("attachmentIds_1") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_0c8a7a2aacde26464cd1cd83f78" FOREIGN KEY ("attachmentIds_2") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_0c8a7a2aacde26464cd1cd83f78"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_ef2f26e3b95aba28ee1a2f18dfb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c8a7a2aacde26464cd1cd83f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef2f26e3b95aba28ee1a2f18df"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_942bfc6e8714bf0345998e6d40b"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_ef2f26e3b95aba28ee1a2f18dfb" PRIMARY KEY ("attachmentIds_1")`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds_2"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_ef2f26e3b95aba28ee1a2f18dfb"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP COLUMN "attachmentIds_1"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD "driveFileId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1" PRIMARY KEY ("driveFileId")`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD "attachmentIds" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "PK_dd60d4adc8e73b7ae339ba9beb1"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "PK_455c6b7067dab24345b8d50bc21" PRIMARY KEY ("attachmentIds", "driveFileId")`);
        await queryRunner.query(`CREATE INDEX "IDX_048e86f11925d47f8895c381d4" ON "note_attachments" ("attachmentIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd60d4adc8e73b7ae339ba9beb" ON "note_attachments" ("driveFileId") `);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_dd60d4adc8e73b7ae339ba9beb1" FOREIGN KEY ("driveFileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_048e86f11925d47f8895c381d43" FOREIGN KEY ("attachmentIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
