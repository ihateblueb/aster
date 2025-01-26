import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737858342040 implements MigrationInterface {
    name = 'Migration1737858342040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "pronouns" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pronouns"`);
    }

}
