import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentingWithJoins21718659807821 implements MigrationInterface {
    name = 'ExperimentingWithJoins21718659807821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_react" RENAME COLUMN "emoji" TO "emojiId"`);
        await queryRunner.query(`ALTER TABLE "notes_react" ADD CONSTRAINT "FK_e951c0a4e24349e4f26af09c571" FOREIGN KEY ("emojiId") REFERENCES "emojis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_react" DROP CONSTRAINT "FK_e951c0a4e24349e4f26af09c571"`);
        await queryRunner.query(`ALTER TABLE "notes_react" RENAME COLUMN "emojiId" TO "emoji"`);
    }

}
