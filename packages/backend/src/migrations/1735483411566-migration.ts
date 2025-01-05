import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735483411566 implements MigrationInterface {
	name = 'Migration1735483411566';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_1f9b2f0fe1b15530e46aa893a4e"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP COLUMN "noteIds"`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD "noteIds" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_1f9b2f0fe1b15530e46aa893a4e" FOREIGN KEY ("noteIds") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
