import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734486712016 implements MigrationInterface {
    name = 'Migration1734486712016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ALTER COLUMN "alt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ALTER COLUMN "alt" SET NOT NULL`);
    }

}
