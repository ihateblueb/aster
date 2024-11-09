import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730183862706 implements MigrationInterface {
    name = 'Migration1730183862706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_like" DROP CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_29daa447591139b74774c12e5a7"`);
        await queryRunner.query(`CREATE TABLE "note_react" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "emojiId" character varying NOT NULL, "noteId" character varying NOT NULL, "createdAt" character varying NOT NULL, "Emoji" character varying, CONSTRAINT "REL_0661edae8befa45f9e12d16e20" UNIQUE ("noteId"), CONSTRAINT "PK_4f10b40fa455ab13ab338508237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note_like" DROP COLUMN "emojiId"`);
        await queryRunner.query(`ALTER TABLE "note_like" DROP COLUMN "Emoji"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "apId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "creatorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "noteId" character varying`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "apId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_72755dd469752faa57ca4b5cfb5" FOREIGN KEY ("Emoji") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_0661edae8befa45f9e12d16e204" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_29daa447591139b74774c12e5a7" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_29daa447591139b74774c12e5a7"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec"`);
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_0661edae8befa45f9e12d16e204"`);
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_72755dd469752faa57ca4b5cfb5"`);
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_35b1a60a5d2339f0ee2ade56ca7"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "apId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "noteId" character varying`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "creatorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "apId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_like" ADD "Emoji" character varying`);
        await queryRunner.query(`ALTER TABLE "note_like" ADD "emojiId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "note_react"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_29daa447591139b74774c12e5a7" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_4ec8340b89b02ddf342e770e4ec" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_like" ADD CONSTRAINT "FK_26ac46b4ef390acf65431b13e4f" FOREIGN KEY ("Emoji") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
