import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733975514226 implements MigrationInterface {
	name = 'Migration1733975514226';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "replyIds"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "replyIds" character varying array`
		);
	}
}
