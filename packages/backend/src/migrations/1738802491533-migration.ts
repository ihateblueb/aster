import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738802491533 implements MigrationInterface {
	name = 'Migration1738802491533';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "emoji" ADD "updatedAt" character varying`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "emoji" DROP COLUMN "updatedAt"`);
	}
}
