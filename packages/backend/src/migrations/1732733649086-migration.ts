import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732733649086 implements MigrationInterface {
	name = 'Migration1732733649086';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note"
				ADD "repeatId" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "note"
				ADD "repeatIds" character varying array`
		);
		await queryRunner.query(
			`ALTER TABLE "note"
				ADD CONSTRAINT "FK_967b052e6f1aadbfca94ae01818" FOREIGN KEY ("repeatId") REFERENCES "note" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_967b052e6f1aadbfca94ae01818"`
		);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "repeatIds"`);
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "repeatId"`);
	}
}
