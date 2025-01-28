import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738039796947 implements MigrationInterface {
	name = 'Migration1738039796947';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "note" ADD "reactionIds" character varying array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "reactionIds"`);
	}
}
