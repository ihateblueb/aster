import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738041310589 implements MigrationInterface {
	name = 'Migration1738041310589';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "reactionIds"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "reactionIds" character varying array`
		);
	}
}
