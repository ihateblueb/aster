import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738041443880 implements MigrationInterface {
	name = 'Migration1738041443880';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "reactionIds" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "reactionIds"`);
	}
}
