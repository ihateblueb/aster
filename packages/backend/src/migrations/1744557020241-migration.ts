import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744557020241 implements MigrationInterface {
    name = 'Migration1744557020241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pronouns"`);
        await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "poll" ADD "keys" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "poll" ADD "values" character varying array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "values"`);
        await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "keys"`);
        await queryRunner.query(`ALTER TABLE "poll" ADD "value" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "poll" ADD "key" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "pronouns" character varying`);
    }

}
