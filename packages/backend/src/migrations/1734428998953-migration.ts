import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734428998953 implements MigrationInterface {
    name = 'Migration1734428998953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
