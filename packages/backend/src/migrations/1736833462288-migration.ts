import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736833462288 implements MigrationInterface {
    name = 'Migration1736833462288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_4168e03455fab46fb4e446b3cef"`);
        await queryRunner.query(`ALTER TABLE "drive_file" DROP COLUMN "noteId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drive_file" ADD "noteId" character varying`);
        await queryRunner.query(`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_4168e03455fab46fb4e446b3cef" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
