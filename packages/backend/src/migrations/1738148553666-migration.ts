import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738148553666 implements MigrationInterface {
	name = 'Migration1738148553666';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "metadata" jsonb array`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "metadata" jsonb`);
	}
}
