import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmojiAdjustNotification1718645353237 implements MigrationInterface {
    name = 'AddEmojiAdjustNotification1718645353237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emojis" ("id" character varying NOT NULL, "created_at" character varying, "updated_at" character varying, "local" character varying, "host" character varying, "name" character varying, "url" character varying, CONSTRAINT "PK_9adb96a675f555c6169bad7ba62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_notification" ADD "reaction" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notification" DROP COLUMN "reaction"`);
        await queryRunner.query(`DROP TABLE "emojis"`);
    }

}
