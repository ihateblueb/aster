import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737837813732 implements MigrationInterface {
    name = 'Migration1737837813732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_72755dd469752faa57ca4b5cfb5"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "emojis" character varying array`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD "apId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_f94b8e86be932d0fb5aaa244ab2" PRIMARY KEY ("id", "apId")`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_d14032ad1ab5967b99a52388754" FOREIGN KEY ("Emoji", "Emoji") REFERENCES "emoji"("id","apId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_d14032ad1ab5967b99a52388754"`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_f94b8e86be932d0fb5aaa244ab2"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP COLUMN "apId"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "emojis"`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_72755dd469752faa57ca4b5cfb5" FOREIGN KEY ("Emoji") REFERENCES "emoji"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
