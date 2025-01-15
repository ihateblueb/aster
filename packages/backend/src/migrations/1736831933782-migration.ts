import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736831933782 implements MigrationInterface {
    name = 'Migration1736831933782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_626c0c772a0a953a43f6ad7fdd0"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "attachmentsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "attachmentsId" character varying`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_626c0c772a0a953a43f6ad7fdd0" FOREIGN KEY ("attachmentsId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
