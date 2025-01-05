import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735482491717 implements MigrationInterface {
	name = 'Migration1735482491717';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD "origin" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_1f9b2f0fe1b15530e46aa893a4e" FOREIGN KEY ("noteIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_1f9b2f0fe1b15530e46aa893a4e"`
		);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "origin"`);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
	}
}
