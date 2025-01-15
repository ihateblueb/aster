import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736841131686 implements MigrationInterface {
    name = 'Migration1736841131686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbbbcdc5cf6e96561145f77941"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" RENAME COLUMN "noteId" TO "attachmentIds"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" RENAME CONSTRAINT "PK_24d1170576078dd6efd984b22e1" TO "PK_455c6b7067dab24345b8d50bc21"`);
        await queryRunner.query(`CREATE INDEX "IDX_048e86f11925d47f8895c381d4" ON "note_attachments" ("attachmentIds") `);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_048e86f11925d47f8895c381d43" FOREIGN KEY ("attachmentIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_attachments" DROP CONSTRAINT "FK_048e86f11925d47f8895c381d43"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_048e86f11925d47f8895c381d4"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" RENAME CONSTRAINT "PK_455c6b7067dab24345b8d50bc21" TO "PK_24d1170576078dd6efd984b22e1"`);
        await queryRunner.query(`ALTER TABLE "note_attachments" RENAME COLUMN "attachmentIds" TO "noteId"`);
        await queryRunner.query(`CREATE INDEX "IDX_cbbbcdc5cf6e96561145f77941" ON "note_attachments" ("noteId") `);
        await queryRunner.query(`ALTER TABLE "note_attachments" ADD CONSTRAINT "FK_cbbbcdc5cf6e96561145f77941c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
