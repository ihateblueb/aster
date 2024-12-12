import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733966706371 implements MigrationInterface {
    name = 'Migration1733966706371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "mpath"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "nsleft" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "note" ADD "nsright" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsright"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "nsleft"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "mpath" character varying DEFAULT ''`);
    }

}
