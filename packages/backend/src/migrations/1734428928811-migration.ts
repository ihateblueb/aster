import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734428928811 implements MigrationInterface {
    name = 'Migration1734428928811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ADD "type" character varying NOT NULL`);
    }

}
