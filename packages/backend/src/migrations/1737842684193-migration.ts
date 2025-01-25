import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737842684193 implements MigrationInterface {
    name = 'Migration1737842684193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_d14032ad1ab5967b99a52388754"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD "shortcode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_f94b8e86be932d0fb5aaa244ab2"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_dfae6c60c7e4d3e9127ab68f98c" PRIMARY KEY ("id", "apId", "shortcode")`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD "host" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_dfae6c60c7e4d3e9127ab68f98c"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_6774cf4d038723353237624669d" PRIMARY KEY ("id", "apId", "shortcode", "host")`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_7e016590b35222970defdc8c004" FOREIGN KEY ("Emoji", "Emoji", "Emoji", "Emoji") REFERENCES "emoji"("id","apId","shortcode","host") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_react" DROP CONSTRAINT "FK_7e016590b35222970defdc8c004"`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_6774cf4d038723353237624669d"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_dfae6c60c7e4d3e9127ab68f98c" PRIMARY KEY ("id", "apId", "shortcode")`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP COLUMN "host"`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "PK_dfae6c60c7e4d3e9127ab68f98c"`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "PK_f94b8e86be932d0fb5aaa244ab2" PRIMARY KEY ("id", "apId")`);
        await queryRunner.query(`ALTER TABLE "emoji" DROP COLUMN "shortcode"`);
        await queryRunner.query(`ALTER TABLE "note_react" ADD CONSTRAINT "FK_d14032ad1ab5967b99a52388754" FOREIGN KEY ("Emoji", "Emoji") REFERENCES "emoji"("id","apId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
