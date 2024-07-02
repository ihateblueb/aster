import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinColumnProperly1719943272275 implements MigrationInterface {
    name = 'JoinColumnProperly1719943272275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" ADD "emojiId" character varying`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "UQ_484892c1c9bbf117892cd92b017" UNIQUE ("emojiId")`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_484892c1c9bbf117892cd92b017" FOREIGN KEY ("emojiId") REFERENCES "emoji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_484892c1c9bbf117892cd92b017"`);
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "UQ_484892c1c9bbf117892cd92b017"`);
        await queryRunner.query(`ALTER TABLE "note_react" DROP COLUMN "emojiId"`);
    }

}
